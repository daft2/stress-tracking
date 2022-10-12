import React, { ChangeEvent } from "react";
import StressTrackApi from "../api/StressTrackApi";
import InputField from "./InputField";
import TrackHistory from "./TrackHistory";

export type StressProps = {
  created_at?: Date | string;
  stress_level: number | string;
  image_url?: string;
};

const StressForm = () => {
  const [data, setData] = React.useState<StressProps>({
    stress_level: "1",
  });

  return (
    <div>
      <h1 className="font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text pt-2 text-center text-3xl text-transparent">
        Track current stress level
      </h1>
      <form
        onSubmit={(e) => {}}
        className="flex flex-col items-center justify-center gap-2"
      >
        <InputField
          label="Upload Image"
          type={"file"}
          accept="image/*"
          onChange={(e) => {}}
          className="block w-auto text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
          required
        />
        <InputField
          label="Stress Level"
          type={"number"}
          value={data?.stress_level}
          onChange={(e) =>
            setData((prev) => ({ ...prev, stress_level: e.target.value }))
          }
          min={1}
          max={5}
          className="px-2 w-fit bg-neutral-700"
        />
        <InputField
          type={"submit"}
          className="border border-indigo-300 hover:bg-indigo-300/50 rounded p-1 cursor-pointer mt-2"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default StressForm;
