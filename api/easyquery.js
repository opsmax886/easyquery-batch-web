const EASYQUERY_URL = "http://www.esalesoft.com:981/EQ3/PTS";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ Err: "Only POST is allowed" }, { status: 405 });
    }

    try {
      const bodyText = await request.text();
      const params = new URLSearchParams(bodyText);
      const P = params.get("P");
      const T = params.get("T");
      const M = params.get("M");

      if (!P || !T || !M) {
        return Response.json({ Err: "P, T, M are required" }, { status: 400 });
      }

      const upstreamBody = new URLSearchParams({ P, T, M });
      const upstream = await fetch(EASYQUERY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: upstreamBody,
      });

      const text = await upstream.text();
      return new Response(text, {
        status: upstream.ok ? 200 : upstream.status,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    } catch (error) {
      return Response.json(
        { Err: error.message || "EasyQuery proxy failed" },
        { status: 502 }
      );
    }
  },
};
