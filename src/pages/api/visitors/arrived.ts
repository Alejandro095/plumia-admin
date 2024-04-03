export async function GET() {
    return new Response(
        JSON.stringify({msg: 'Arrived'}), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
};