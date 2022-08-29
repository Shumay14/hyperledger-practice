package main

import (
	"encoding/json"
	"fmt"

	// "github.com/hyperledger/fabric/core/chaincode/shim"
	// "github.com/hyperledger/fabric/protos/peer"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

type QueryAllBonds struct {
	BondNum int
}

// Define Data Structure
// describes ESGBond details
type ESGBond struct {
	ID            string `json:"id"`
	Owner         string `json:"owner"`
	Issuer        string `json:"issuers"`
	Purpose       string `json:"purpose"`
	MaxIssuersNum int    `json:"maxissuersnum"`
	BondNum       int    `json:"bondnum"`
	MaxBondNum    int    `json:"maxbondnum"`
	FaceValue     int    `json:"facevalue"`
	PresentValue  int    `json:"presentvalue"`
	DiscountRate  int    `json:"discountrate"`
	IssueDate     string `json:"issuedate"`
	Maturity      int    `json:"maturity"`
	// Investor      string `json:"investor"`
}

// describes Corporate details
type Corporate struct {
	Name      string `json:"name"`
	ID        string `json:"id"`
	BondIssue string `json:"bondissue"`
	Balance   int    `json:"balance"`
}

// describe Investor details
type Investor struct {
	Name      string `json:"name"`
	ID        string `json:"id"`
	OwnedBond string `json:"ownedbond"`
	Balance   int    `json:"balance"`
}

// why is it here? just for test? or check?
func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	esgbonds := []ESGBond{
		{ID: "seo", Owner: "seo", Issuer: "Samsung", MaxIssuersNum: 5, BondNum: 1, MaxBondNum: 100, FaceValue: 10000, PresentValue: 9000, DiscountRate: 10, IssueDate: "2022-01-01", Maturity: 1},
		{ID: "jang", Owner: "seo", Issuer: "SK", MaxIssuersNum: 5, BondNum: 2, MaxBondNum: 100, FaceValue: 10000, PresentValue: 9000, DiscountRate: 10, IssueDate: "2022-01-01", Maturity: 1},
		{ID: "yeon", Owner: "seo", Issuer: "Hyundai", MaxIssuersNum: 5, BondNum: 3, MaxBondNum: 100, FaceValue: 10000, PresentValue: 9000, DiscountRate: 10, IssueDate: "2022-01-01", Maturity: 1},
	}

	// _ index 안받음
	for _, esgbond := range esgbonds {
		esgbondJSON, err := json.Marshal(esgbond)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(esgbond.Issuer, esgbondJSON)
		if err != nil {
			// Errorf 에러 스트링 객체로 만들어줌
			return fmt.Errorf("failed to put to world state. %v", err.Error())
		}
	}
	return nil
}

// AssetExists return true when asset with given ID exists in world state.
func (s *SmartContract) AssetExists(ctx contractapi.TransactionContextInterface, id string) (bool, error) {
	esgbondJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return false, fmt.Errorf("failed to read from world state: %v", err)
	}

	return esgbondJSON != nil, nil
}

/*
** CC functions for corporates
 */

// Issue new Bond
func (s *SmartContract) IssueBond(ctx contractapi.TransactionContextInterface, id string, owner string, issuer string, maxissuersnum int, bondnum int, maxbondnum int,
	facevalue int, presentvalue int, discountrate int, issuedate string, maturity int) error {
	// parameters 10
	esgbond := ESGBond{
		ID:    id,
		Owner: owner,
		// Investor:      investor,
		Issuer:        issuer,
		MaxIssuersNum: maxissuersnum,
		BondNum:       bondnum,
		MaxBondNum:    maxbondnum,
		FaceValue:     facevalue,
		PresentValue:  presentvalue,
		DiscountRate:  discountrate,
		IssueDate:     issuedate,
		Maturity:      maturity,
	}

	// convert to JSON type
	esgbondJSON, err := json.Marshal(esgbond)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(issuer, esgbondJSON)

}

// Delete Bond and Transfer Asset as much as amount of the bond.
func (s *SmartContract) RedeemBond(ctx contractapi.TransactionContextInterface, id string) error {
	esgbond, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if !esgbond {
		return fmt.Errorf("the asset %s does not exist", id)
	}

	return ctx.GetStub().DelState(id)
}

// func (s *SmartContract) ReceivableBondOffering(ctx contractapi.TransactionContextInterface)

/*
** CC functions for investors
 */
func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface, id string) (*ESGBond, error) {
	esgbondJSON, err := ctx.GetStub().GetState(id)
	if err != nil {
		return nil, fmt.Errorf("failed to read from world state: %v", err)
	}
	if esgbondJSON == nil {
		return nil, fmt.Errorf("the asset %s does not exist", id)
	}

	var esgbond ESGBond
	err = json.Unmarshal(esgbondJSON, &esgbond)
	if err != nil {
		return nil, err
	}

	return &esgbond, nil
}

// TransferAsset is to change owner field of esgbond with given id in worldstate, and return the ex-owner.
// func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, id string, newOwner string) (string, error) {
// 	esgbond, err := s.ReadAsset(ctx, id)
// 	if err != nil {
// 		return "Error!", err
// 	}

// 	newOwner = esgbond.Owner
// 	esgbond.Owner = newOwner

// 	esgbondJSON, err := json.Marshal(esgbond)
// 	if err != nil {
// 		return "Error!", err
// 	}

// 	return ctx.GetStub().PutState(id, esgbondJSON)
// }

// func (s *SmartContract) DepositAsset(ctx contractapi.TransactionContextInterface) {}
// func (s *SmartContract) WithdrawAsset(ctx contractapi.TransactionContextInterface) {}

// ListAllBonds returns all esgbonds found in worldstate
func (s *SmartContract) ListAllBonds(ctx contractapi.TransactionContextInterface) ([]*ESGBond, error) {
	// range query with empty string for startKey and endKey does an
	// open-ended query of all assets in the chaincode namespace.
	resultsIterator, err := ctx.GetStub().GetStateByRange("", "")
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	//
	var esgbonds []*ESGBond
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}

		var esgbond ESGBond
		err = json.Unmarshal(queryResponse.Value, &esgbond)
	}
	return esgbonds, nil
}

// main function
func main() {

	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create fabcar chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting fabcar chaincode: %s", err.Error())
	}

}
