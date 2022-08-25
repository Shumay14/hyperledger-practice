package esgbondsystem

import (
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing an Asset
type SmartContract struct {
	contractapi.Contract
}

// Define Data Structure
// describes ESGBond details
type ESGBond struct {
	Issuers       string `json:"issuers"`
	MaxIssuersNum int    `json:"maxissuersnum"`
	BondNum       int    `json:"bondnum"`
	MaxBondNum    int    `json:maxbondnum`
	FaceValue     int    `json:fv`
	PresentValue  int    `json:pv`
	DiscountRate  int    `json:discountrate`
	IssueDate     string `json:issuedate`
	Maturity      int    `json:maturity`
	Investor      string `json:investor`
}

// describes Corporate details
type Corporate struct {
	Name      string `json:name`
	ID        string `json:id`
	BondIssue string `json:bondissue`
	Balance   int    `json:balance`
}

// describe Investor details
type Investor struct {
	Name      string `json:name`
	ID        string `json:id`
	OwnedBond string `json:ownedbond`
	Balance   int    `json:balance`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	esgbonds := []ESGBond{
		{Issuers: "", MaxIssuersNum: "", BondNum: "", MaxBondNum: "", FaceValue: "", PresentValue: "", DiscountRate: "", IssueDate: "", Maturity: "", Investor: ""},
	}

	// _ index 안받음
	for _, esgbond := range esgbonds {
		esgbondJSON, err := json.Marshal(esgbond)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(esgbond.Issuers, esgbondJSON)
		if err != nil {
			// Errorf 에러 스트링 객체로 만들어줌
			return fmt.Errorf("failed to put to world state. %v", err)
		}

	}
	return nil

}

// CC functions for corporates
// Issue new Bond
func (s *SmartContract) IssueBond(ctx contractapi.TransactionContextInterface, issuers string, maxissuersnum int, bondnum int, maxbondnum int,
	facevalue int, presentvalue int, discountrate int, issuedate string, maturity int, investor string) error {
	exists, err := s.AssetExists(ctx, id)
	if err != nil {
		return err
	}
	if exists {
		return fmt.Errorf("the asset %s already exists", id)
	}

	esgbond := EsgBond{
		Issuers:       issuers,
		MaxIssuersNum: maxissuersnum,
		BondNum:       bondnum,
		MaxBondNum:    maxbondnum,
		FaceValue:     facevalue,
		PresentValue:  presentvalue,
		DiscountRate:  discountrate,
		IssueDate:     issuedate,
		Maturity:      maturity,
		Investor:      investor,
	}

	esgbondJSON, err := json.Marshal(esgbond)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(issuers, esgbondJSON)

}

func (s *SmartContract) RedeemBond(ctx contractapi, TransactionContextInterface, BondNum int, OwnedInvestor string) {
	return
}

func (s *SmartContract) ReceivableBondOffering(ctx contractapi.TransactionContextInterface)

// CC functions for investors
func (s *SmartContract) DepositAsset(ctx contractapi.TransactionContextInterface) {}

func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface) {}

func (s *SmartContract) WithdrawAsset(ctx contractapi.TransactionContextInterface) {}

func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface) {}

func (s *SmartContract) ListBond(ctx contractapi.TransactionContextInterface, id string) {

}
