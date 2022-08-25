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
	Issuers		  string	`json:"issuers"`
	MaxIssuersNum int		`json:"maxissuersnum"`
	BondNum		  int		`json:"bondnum"`
	MaxBondNum	  int		`json:maxbondnum`
	FaceValue 	  int		`json:fv`
	PresentValue  int		`json:pv`
	DiscountRate  int		`json:discountrate`
	IssueDate	  string	`json:issuedate`
	Maturity      int		`json:maturity`
	Investor	  string	`json:investor`
}

// describes Corporate details
type Corporate struct {
	Name		  string	`json:name`
	ID			  string	`json:id`
	BondIssue 	  string	`json:bondissue`
	Balance		  int		`json:balance`
}

// describe Investor details
type Investor struct {
	Name		  string 	`json:name`
	ID			  string	`json:id`
	OwnedBond	  string	`json:ownedbond`
	Balance		  int		`json:balance`
}


func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	esgbond := []ESGBond{
		{Issuers: "", MaxIssuersNum: "", BondNum: "", MaxBondNum: "", FaceValue: "", PresentValue: "", DiscountRate: "", IssueDate: "", Maturity: "", Investor: ""},
	}

	for 
	
}


// CC functions for corporates 
func (s *SmartContract) JoinIssuer(ctx contractapi.TransactionContextInterface) {

}


func (s *SmartContract) IssueBond(ctx contractapi.TransactionContextInterface, Issuers string, MaxIssuersNum int, BondNum int, MaxBondNum int, 
	FaceValue int, PresentValue int, DiscountRate int, IssueDate string, Maturity int, Investor string) error {
		exists, err := s.AssetExists(ctx, id)
		if err != nil {
			return err
		}
		if exists {
			return fmt.Errorf("the asset %s already exists", id)
		}

		
	}


func (s *SmartContract) RedeemBond(ctx contractapi, TransactionContextInterface, BondNum int, OwnedInvestor string) {
	return 
}

func (s *SmartContract) ReceivableBondOffering(ctx contractapi.TransactionContextInterface, )




// CC functions for investors
func (s *SmartContract) DepositAsset(ctx contractapi.TransactionContextInterface) {}


func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface) {}


func (s *SmartContract) WithdrawAsset(ctx contractapi.TransactionContextInterface) {}


func (s *SmartContract) ReadAsset(ctx contractapi.TransactionContextInterface) {}



func (s *SmartContract) ListBond(ctx contractapi.TransactionContextInterface, id string) {

}


