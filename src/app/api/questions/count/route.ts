import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings, IDBSettings } from '@/common/sharedCode/dbUtil';

let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {    
    let qstCatID = request.nextUrl.searchParams.get('qstCatID');

    try {
        // 2. connect to database
        const connection = await mysql.createConnection(connectionParams);
        
        // 3. create a query to fetch data
        let get_exp_query = "";
        get_exp_query = "SELECT COUNT(1) AS qstCount FROM questions WHERE QST_Category = ?";

        // we can use this array to pass parameters to the SQL query
        let values: any[] = [qstCatID];     
        
        // 4. exec the query and retrieve the results
        const [ results ] = await connection.execute(get_exp_query, values);
        console.log(results);

        // 5. close the connection when done
        connection.end();

        const response = {
            error: '',
            returnedStatus: 200,
            data: (results as any)[0].qstCount
        }

        // return the results as a JSON API response
        return NextResponse.json(response, { status: 200});
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
        
        
        return NextResponse.json(response, { status: 500 });
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
            const { categName, categDesc, categColor, categFGColor } = req.data;
            get_exp_query = "INSERT INTO categories (categ_name, categ_desc, categ_color, categ_fg_color) VALUES (?, ?, ?, ?)";
            
            // we can use this array to pass parameters to the SQL query
            values = [ categName, categDesc, categColor, categFGColor ];     

        } else {
            const { categID, categName, categDesc, categColor, categFGColor } = req.data;
            get_exp_query = "UPDATE categories SET categ_name = ?, categ_desc = ?, categ_color = ?, categ_fg_color = ? WHERE categ_ID = ?";
            
            // we can use this array to pass parameters to the SQL query
            values = [ categName, categDesc, categColor, categFGColor, categID ];   
        }

        // 4. exec the query and retrieve the results
        const [ results ] = await connection.execute(get_exp_query, values);
        

        // 5. close the connection when done
        connection.end();

        const response = {
            error: '',
            returnedStatus: 200,
            data: results
        }
        // return the results as a JSON API response
        return NextResponse.json(response, {status: 200});
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
        
        return NextResponse.json(response, { status: 500 });
    }
}    