import { getPastes } from "../utils/PasteStorage";

const MyPastes = () => {
  const pastes = getPastes();

  const getRemainingTime = (createdAt, expireMinutes) => {
    if (!expireMinutes) return "∞";
    const diff =
      createdAt + expireMinutes * 60000 - Date.now();
    return diff > 0 ? Math.ceil(diff / 60000) + " min" : "Expired";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Pastes</h2>

        {pastes.length === 0 && (
          <p className="text-gray-500">No pastes created yet.</p>
        )}

        <div className="space-y-4">
          {pastes.map((p, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {p.link}
                </a>
                <p className="text-sm text-gray-500">
                  Time left: {getRemainingTime(p.createdAt, p.expireMinutes)} | 
                  Max views: {p.maxViews || "∞"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPastes;
