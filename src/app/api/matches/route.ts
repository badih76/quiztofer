import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings, IDBSettings } from '@/common/sharedCode/dbUtil';
import { generateRandomCode, getResponseHeaders } from "@/common/sharedCode/general";

let connectionParams = GetDBSettings();
const headers = getResponseHeaders();


export async function GET(request: NextRequest) {    
    let matchCode = request.nextUrl.searchParams.get('matchCode');

    try {
        // 2. connect to database
        const connection = await mysql.createConnection(connectionParams);
        
        // 3. create a query to fetch data
        let get_exp_query = "";
        get_exp_query = "SELECT * FROM matches WHERE mtch_unique_code = ?";

        // we can use this array to pass parameters to the SQL query
        let values: any[] = [ matchCode ];     
        
        // 4. exec the query and retrieve the results
        const [ results ] = await connection.execute(get_exp_query, values);
        console.log(results);

        // 5. close the connection when done
        connection.end();

        const response = {
            error: '',
            returnedStatus: 200,
            data: results
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
        
        
        return NextResponse.json(response, { status: 500 , headers });
    }
}    

// export async function POST(request: NextRequest) {    

//     const req = await request.json();
//     console.log("Req: ", req);
//     const params = req;

//     try {
//         // 2. connect to database
//         const connection = await mysql.createConnection(connectionParams);

//         let values: any[]; 
        
//         // 3. create a query to save data
//         let get_exp_query = "";

//         const { category, qstCount, timeToJoin, timeToAnswer, matchName } = req;
//         get_exp_query = "SELECT * FROM questions WHERE qst_category = ? LIMIT " + (qstCount) ;
        
//         // we can use this array to pass parameters to the SQL query
//         values = [ category ];     


//         // 4. exec the query and retrieve the results
//         const [ results ] = await connection.execute(get_exp_query, values);
        

//         // 5. add the match to the matches table
//         const code = generateRandomCode(8);
//         const questions = JSON.stringify(results);
//         const startingTime = new Date();


//         get_exp_query = "INSERT INTO matches (mtch_unique_code, mtch_questions, mtch_category, mtch_questions_count, mtch_time_to_join, ";
//         get_exp_query += "mtch_time_to_answer, mtch_name, mtch_url, mtch_starting_time) ";
//         get_exp_query += "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

//         values = [ code, questions, category, qstCount, timeToJoin, timeToAnswer, matchName, '', startingTime.toISOString() ];

//         const qry_results = await connection.execute(get_exp_query, values);


//         const response = {
//             error: '',
//             returnedStatus: 200,
//             data: { code, qry_results }
//         }

//         // 6. close the connection when done
//         connection.end();

//         // return the results as a JSON API response
//         return NextResponse.json(response, {status: 200});
//     } catch (err) {
//         let errMessage = "";

//         console.log((Object.hasOwn(err as any, "message")), (Object.hasOwn(err as any, "code")))
//         if (Object.hasOwn((err as any), "message") && (err as any).message) errMessage = (err as any).message;
//         else if (Object.hasOwn((err as any), "code") && (err as any).code) errMessage = (err as any).code;
//         else errMessage = "Internal server error occured!";

//         console.log('ERROR: API - ', errMessage);

//         const response = {
//             error: errMessage,
//             returnedStatus: 500,
//             data: {}
//         }
        
//         return NextResponse.json(response, { status: 500 });
//     }
// }    