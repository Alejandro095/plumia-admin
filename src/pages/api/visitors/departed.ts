export async function GET() {
    return new Response(
        JSON.stringify({msg: 'Departed'}), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
};