export async function GET() {
    return new Response(JSON.stringify({ msg: "Sign In" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
