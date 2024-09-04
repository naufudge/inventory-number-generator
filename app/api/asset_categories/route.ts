import { NextRequest, NextResponse } from "next/server";
import assetCats from '@/public/asset_category_lists.json'
import assetNums from '@/public/asset_category_numbers.json'
import mainCategories from '@/public/main_categories.json'

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json({
            assetCats, 
            assetNums,
            mainCategories
        });
    } catch (error: any) {
        NextResponse.json({
            message: error.message,
            status: 400
        })
    }
}



