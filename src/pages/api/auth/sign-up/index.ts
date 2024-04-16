export async function GET() {
    return new Response(JSON.stringify({ msg: "Sign Up" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
