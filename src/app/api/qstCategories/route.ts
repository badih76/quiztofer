import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings, IDBSettings } from '@/common/sharedCode/dbUtil';
import { getResponseHeaders } from "@/common/sharedCode/general";

let connectionParams = GetDBSettings();
const headers = getResponseHeaders();

export async function GET(request: NextRequest) {    
    // let questionID = request.nextUrl.searchParams.get('questionID');
    // let questionContain = request.nextUrl.searchParams.get('qstContain');
    // let qstCategory = request.nextUrl.searchParams.get('qstCategory');
    // let qstCatTitle = request.nextUrl.searchParams.get('qstCatTitle');

    try {
        // 2. connect to database
        const connection = await mysql.createConnection(connectionParams);
        
        
        // 3. create a query to fetch data
        let get_exp_query = "";
        get_exp_query = "SELECT * FROM categories";

        // we can use this array to pass parameters to the SQL query
        let values: any[] = [];     
        
        // 4. exec the query and retrieve the results
        const [ results ] = await connection.execute(get_exp_query, values);

        let categories = (results as any).map((c: any) => {
            return {cat_id: parseInt(c.CAT_ID), cat_title: c.CAT_Title, cat_description: c.CAT_Description}
        })
        // 5. close the connection when done
        connection.end();

        const response = {
            error: '',
            returnedStatus: 200,
            data: categories //results
        }

        // return the results as a JSON API response
        return NextResponse.json(response, { 
            status: 200, 
            headers
        });

    } catch (err) {
        let errMessage = "";

        console.log((Object.hasOwn(err as any, "message")), (Object.hasOwn(err as any, "code")))

        if (Object.hasOwn((err as any), "message") && (err as any).message) errMessage = (err as any).message;
        else if (Object.hasOwn((err as any), "code") && (err as any).code) errMessage = (err as any).code;
        else errMessage = "Internal server error occured!";

        console.log('ERROR: API - ', errMessage);
        console.log(err);

        const response = {
            error: errMessage,
            returnedStatus: 500,
            data: {}
        }
        
        
        return NextResponse.json(response, { status: 500, headers });
    }
}    

export async function POST(request: NextRequest) {    

    const req = await request.json();
    console.log("Req: ", req);

    try {
        // 2. connect to database
        const connection = await mysql.createConnection(connectionParams);
        
        let values: any[]; 

        // 3. create a query to save data
        let get_exp_query = "";

        if(req.action == 'add') {
            const { cat_title, cat_description } = req.data;
            get_exp_query = "INSERT INTO categories (cat_title, cat_description) VALUES (?, ?)";
            
            // we can use this array to pass parameters to the SQL query
            values = [ cat_title, cat_description ];     

        } else {
            const { cat_title, cat_description, cat_id } = req.data;
            get_exp_query = "UPDATE categories SET cat_title = ?, cat_description = ? WHERE cat_id = ?";
            
            // we can use this array to pass parameters to the SQL query
            values = [ cat_title, cat_description, cat_id ];   
        }
        
        // 4. exec the query and retrieve the results
        const [ results ] = await connection.execute(get_exp_query, values);

        console.log(results);
        // let categories = (results as any).map((c: any) => {
        //     return {cat_id: c.CAT_ID, cat_title: c.CAT_Title, cat_description: c.CAT_Description}
        // })

        // 5. close the connection when done
        connection.end();

        const response = {
            error: '',
            returnedStatus: 200,
            data: results //results
        }

        // return the results as a JSON API response
        return NextResponse.json(response, { status: 200, headers });
    } catch (err) {
        let errMessage = "";

        console.log((Object.hasOwn(err as any, "message")), (Object.hasOwn(err as any, "code")))
        if (Object.hasOwn((err as any), "message") && (err as any).message) errMessage = (err as any).message;
        else if (Object.hasOwn((err as any), "code") && (err as any).code) errMessage = (err as any).code;
        else errMessage = "Internal server error occured!";

        console.log('ERROR: API - ', errMessage);

        const response = {
            error: errMessage,
            returnedStatus: 500,
            data: {}
        }
        
        
        return NextResponse.json(response, { status: 500, headers });
    }
}    