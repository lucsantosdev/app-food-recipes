const BASE_URL = 'https://api.spoonacular.com';

function json(res, status, payload) {
  res.status(status).json(payload);
}

function buildUpstreamUrl(endpoint, query, apiKey) {
  switch (endpoint) {
    case 'random': {
      const take = Number(query.take ?? 10);
      const safeTake = Number.isFinite(take) ? Math.min(Math.max(take, 1), 50) : 10;
      return `${BASE_URL}/recipes/random?apiKey=${apiKey}&number=${safeTake}`;
    }
    case 'search': {
      const term = String(query.query ?? '').trim();
      if (!term) {
        return null;
      }

      return `${BASE_URL}/recipes/complexSearch?apiKey=${apiKey}&query=${encodeURIComponent(term)}&number=10`;
    }
    case 'recipe': {
      const id = Number(query.id);
      if (!Number.isInteger(id) || id <= 0) {
        return null;
      }

      return `${BASE_URL}/recipes/${id}/information?apiKey=${apiKey}`;
    }
    case 'similar': {
      const id = Number(query.id);
      if (!Number.isInteger(id) || id <= 0) {
        return null;
      }

      return `${BASE_URL}/recipes/${id}/similar?apiKey=${apiKey}`;
    }
    default:
      return null;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return json(res, 500, {
      error: 'Missing SPOONACULAR_API_KEY on server',
    });
  }

  const endpoint = String(req.query.endpoint ?? '').trim();
  const upstreamUrl = buildUpstreamUrl(endpoint, req.query, apiKey);
  if (!upstreamUrl) {
    return json(res, 400, { error: 'Invalid endpoint or parameters' });
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl);
    const text = await upstreamResponse.text();

    res.setHeader('Content-Type', upstreamResponse.headers.get('content-type') || 'application/json');
    return res.status(upstreamResponse.status).send(text);
  } catch {
    return json(res, 502, { error: 'Failed to contact Spoonacular API' });
  }
};