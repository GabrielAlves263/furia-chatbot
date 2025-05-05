export async function getNextFuriaMatch() {
  const token = process.env.PANDASCORE_API_KEY;

  const res = await fetch(
    "https://api.pandascore.co/csgo/matches?filter[number_of_games]=3&filter[opponent_id]=furia&filter[future]=true&sort=&page=1&per_page=10",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Erro ao buscar partidas da FURIA");

  const data = await res.json();

  if (data.length === 0) return null;

  const match = data[0];

  return {
    opponent: match.opponents.find(
      (o: { opponent: { name: string } }) => o.opponent.name !== "FURIA"
    )?.opponent.name,
    beginsAt: match.begin_at,
    league: match.league?.name,
    serie: match.serie?.full_name,
  };
}
