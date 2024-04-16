export async function GET() {
    return new Response(JSON.stringify({ msg: "Index" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
