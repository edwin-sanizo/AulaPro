export function getLocalDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('es-BO', {
    timeZone: 'America/La_Paz',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const parts = formatter.formatToParts(now);
  const year = parts.find(p => p.type === 'year').value;
  const month = parts.find(p => p.type === 'month').value;
  const day = parts.find(p => p.type === 'day').value;
  return `${year}-${month}-${day}`;
}

export function getLocalDateTime() {
  const now = new Date();
  // Restar 4 horas para Bolivia (UTC-4)
  const boliviaTime = new Date(now.getTime() - 4 * 60 * 60 * 1000);

  const year = boliviaTime.getFullYear();
  const month = String(boliviaTime.getMonth() + 1).padStart(2, "0");
  const day = String(boliviaTime.getDate()).padStart(2, "0");

  const hours = String(boliviaTime.getHours()).padStart(2, "0");
  const minutes = String(boliviaTime.getMinutes()).padStart(2, "0");
  const seconds = String(boliviaTime.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// ✅ Formatear fecha de YYYY-MM-DD a DD-MM-YYYY
export function formatearFechaBolivia(fecha) {
  if (!fecha) return '';
  const partes = fecha.split('-');
  if (partes.length !== 3) return fecha;
  return `${partes[2]}-${partes[1]}-${partes[0]}`;
}