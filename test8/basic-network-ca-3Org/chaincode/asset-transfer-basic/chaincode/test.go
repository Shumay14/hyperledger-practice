package bondsystem

import (
	"encoding/json",
	"fmt",

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
	Name		  string
	ID			  string	
	BondIssue 	  string
	Balance		  int
}

// describe Investor details
type Investor struct {
	Name		  string
	ID			  string
	OwnedBond	  string
	Balance		  int

}





