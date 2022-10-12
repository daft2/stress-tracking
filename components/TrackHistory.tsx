import Image from "next/image";
import { StressProps } from "./StressForm";

type Props = {
  history: StressProps[] | [];
};

const TrackHistory = (props: Props) => {
  return (
    <div>
      <h1 className="text-center font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text pt-2 mb-2 mt-4 text-xl text-transparent">
        History
      </h1>
      {props.history?.length == 0 && (
        <div>
          <h1 className="text-white">
            You don&apos;t have any stress tracking history yet...
          </h1>
        </div>
      )}
      {props.history?.length > 0 && (
        <div className="not-prose relative rounded-xl overflow-hidden bg-slate-800/25">
          <div className="absolute inset-0 bg-grid-slate-700/25"></div>
          <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm overflow-hidden my-8">
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
                      Date
                    </th>
                    <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
                      Stress Level
                    </th>
                    <th className="border-b border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-200 text-left">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.history.map((item, index) => (
                    <tr key={`history-item-key-${index}`}>
                      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
                        {item.created_at?.toString().slice(0, 19)}
                      </td>
                      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400 text-center">
                        {item.stress_level}
                      </td>
                      <td className="border-b border-slate-700 p-4 pl-8 text-slate-400">
                        <Image
                          src={item.image_url!}
                          width={100}
                          height={100}
                          objectFit={"cover"}
                          alt={"Image stress level"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none border rounded-xl border-white/5"></div>
        </div>
      )}
    </div>
  );
};

export default TrackHistory;
