import React from "react";
import clsx from "clsx";
import { Upload, RotateCcw } from "lucide-react";
import { Modal, Seg } from "./ui";

export default function LoadDataModal({ showLoad, setShowLoad, live, setLive, onFile, msg, reset }) {
  return (
    <>
{/* Modal: cargar / simular */}
      {showLoad && (
        <Modal title="Cargar o simular datos" onClose={() => setShowLoad(false)}>
          <div className="space-y-5 text-sm">
            <div>
              <div className="mb-2 text-zinc-400">Modo de datos</div>
              <Seg value={live ? "live" : "static"} onChange={(k) => setLive(k === "live")} options={[["live", "Simulación en vivo"], ["static", "Datos fijos"]]} />
            </div>
            <div>
              <div className="mb-2 text-zinc-400">Subir archivo CSV o JSON</div>
              <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-white/20 p-6 text-zinc-400 hover:border-cyan-400/60 hover:text-white">
                <Upload size={20} /><span>Elegir archivo .csv o .json</span>
                <input type="file" accept=".csv,.json" onChange={onFile} className="hidden" />
              </label>
              {msg && <p className={clsx("mt-2 text-xs", msg.ok ? "text-emerald-400" : "text-rose-400")}>{msg.t}</p>}
            </div>
            <div className="rounded-lg bg-black/40 p-3 text-xs leading-relaxed text-zinc-400">
              <div className="mb-1 text-zinc-300">Columnas reconocidas</div>
              Videos: <code>title, creator, url, views, likes, retention, impact, buys, type</code><br />
              Serie del token: <code>date, price, volume, views</code><br />
              JSON: un array, o un objeto <code>{"{ videos: [...], series: [...] }"}</code>
            </div>
            <button onClick={reset} className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white"><RotateCcw size={13} />Volver a los datos simulados</button>
          </div>
        </Modal>
      )}

    </>
  );
}
