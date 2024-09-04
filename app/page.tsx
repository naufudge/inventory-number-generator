'use client';

import { useEffect, useState } from "react";
import axios from "axios";

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface AssetNumbersType {
  [key: string]: number;
}

interface AssetCategoriesType {
  [key: string]: {
    [key: string]: {
      [key: string]: string[] | []
    }
  };
}

export default function Home() {
  const [categoryNums, setCategoryNums] = useState<AssetNumbersType>({})
  const [assetCategories, setAssetCategories] = useState<AssetCategoriesType>({})
  const [mainAssetCategories, setMainAssetCategories] = useState<string[]>([])

  const [subsubsubCatItems, setsubsubsubCatItems] = useState<string[]>([])
  const [mainSelectState, setMainSelectState] = useState(true)

  const [companyCode, setCompanyCode] = useState("")
  const [purchaseYear, setPurchaseYear] = useState("")
  const [selectedMainCat, setSelectedMainCat] = useState("")
  const [selectedSubCat, setSelectedSubCat] = useState("")
  const [selectedSubSubCat, setSelectedSubSubCat] = useState("")
  const [selectedSubSubSubCat, setSelectedSubSubSubCat] = useState("")

  // UseEffect to get the asset categories and category numbers data
  useEffect(() => {
    const getCategoryData = async () => {
      try {
        const response = await axios.get("/api/asset_categories")
        setCategoryNums(response.data.assetNums)
        setAssetCategories(response.data.assetCats)
        setMainAssetCategories(response.data.mainCategories)
        console.log(response.data.assetNums)
      } catch (error: any) {
        console.log(error.message)
      }
    }
    
    if (mainAssetCategories.length === 0) {
      getCategoryData()
    }
  }, [categoryNums, assetCategories, mainAssetCategories])

  // UseEffect to handle the main category select state
  useEffect(() => {
    if (purchaseYear != "" && companyCode != "") {
      setMainSelectState(false)
    } else {
      setMainSelectState(true)
      handleMainCatSelect("")
    }
  }, [purchaseYear, companyCode, mainSelectState])


  const handleMainCatSelect = (cat: string) => {
    setSelectedMainCat(cat)
    handleSubCatSelect("")
  }

  const handleSubCatSelect = (cat: string) => {
    setSelectedSubCat(cat)
    handleSubSubCatSelect("")
  }

  const handleSubSubCatSelect = (cat: string) => {
    if (cat != "") {
      setsubsubsubCatItems(assetCategories[selectedMainCat][selectedSubCat][cat])
    } else {
      setsubsubsubCatItems([])
    }
    setSelectedSubSubCat(cat)
    setSelectedSubSubSubCat("")
  }

  return (
    <main className="w-screen my-[40px] place-items-center justify-center flex flex-col gap-9">

    {/* Company Code */}
    <div>
      <Label htmlFor="company">Company Code</Label>
      <Input 
      type="number" 
      id="company" 
      placeholder="Company Code" 
      className="w-[350px]" 
      onChange={(e) => {setCompanyCode(e.target.value.toString())}}
      />
    </div>
    
    {/* Purchase Year */}
    <div>
      <Label htmlFor="year">Purchase Year</Label>
      <Input 
      type="number" 
      id="year" 
      placeholder="Year" 
      className="w-[350px]" 
      onChange={(e) => {setPurchaseYear(e.target.value.toString())}}
      />
    </div>

    {/* Main Categories */}
    <div>
      <Label htmlFor="main">Main Category</Label>
      <Select disabled={mainSelectState} onValueChange={(e) => {handleMainCatSelect(e)}}>
      <SelectTrigger className="w-[350px]">
        <SelectValue placeholder="Select Main Category" />
      </SelectTrigger>
      <SelectContent>
        {mainAssetCategories.map((cat, index) => (
          <SelectItem key={index} value={cat}>{cat}</SelectItem>
        ))}
      </SelectContent>
    </Select>
    </div>
    

    {/* Sub Category Select */}
    { selectedMainCat != "" && 
    <div>
      <Label htmlFor="sub">Sub Category</Label>
      <Select onValueChange={(e) => {handleSubCatSelect(e)}}>
        <SelectTrigger className="w-[350px]">
          <SelectValue placeholder="Select Sub Category" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(assetCategories[selectedMainCat]).sort().map((cat, index) => (
            <SelectItem key={index} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    }

    {/* Sub Sub Category Select */}
    { selectedSubCat != "" && 
    <div>
      <Label htmlFor="subsub">Sub Sub Category</Label>
      <Select onValueChange={(e) => {handleSubSubCatSelect(e)}}>
        <SelectTrigger className="w-[350px]">
          <SelectValue placeholder="Select Sub Sub Category" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(assetCategories[selectedMainCat][selectedSubCat]).sort().map((cat, index) => (
            <SelectItem key={index} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
      
    }

    {/* Sub Sub Sub Category Select */}
    { subsubsubCatItems.length != 0 &&
    <div>
      <Label htmlFor="subsubsub">Sub Sub Sub Category</Label>
      <Select onValueChange={(e) => {setSelectedSubSubSubCat(e)}}>
        <SelectTrigger className="w-[350px]">
          <SelectValue placeholder="Select Sub Sub Sub Category" />
        </SelectTrigger>
        <SelectContent>
          {subsubsubCatItems.sort().map((cat, index) => (
            <SelectItem key={index} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    }

    {/* Display asset inventory number */}
    <div className="flex gap-3 place-items-center justify-center">
      <div className="font-bold">Inventory Number:</div>
      <div className="flex">
        {companyCode}
        {purchaseYear && "-"}
        {purchaseYear.slice(-2)}
        {selectedMainCat && "-"}
        {categoryNums[selectedMainCat]}
        {selectedSubCat && "-"}
        {categoryNums[selectedSubCat]}
        {selectedSubSubCat && "-"}
        {categoryNums[selectedSubSubCat]}
        {selectedSubSubSubCat && "-"}
        {categoryNums[selectedSubSubSubCat]}
        {companyCode && "-"}
        [item_no.]
      </div>
    </div>
    </main>
  );
}
