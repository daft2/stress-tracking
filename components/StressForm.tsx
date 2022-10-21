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
  const [history, setHistory] = React.useState<StressProps[] | []>([]);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<File | null>(null);

  const fetchHistory = () => {
    StressTrackApi.getAll().then((response) => {
      if (!response.error) {
        setHistory(response.data!);
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const response = await StressTrackApi.create({
      values: data,
      image: image as File,
    });
    if (!response.imgError && !response.error && !response.sizeError) {
      alert("Insert success...");
    } else {
      if (response.imgError) alert(response.imgError);
      if (response.error) alert(response.error);
      if (response.sizeError) alert(response.sizeError);
    }
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  React.useEffect(() => {
    fetchHistory();
    if (isSubmitted) setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <div>
      <h1 className="font-bold bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 bg-clip-text pt-2 text-center text-3xl text-transparent">
        Track current stress level
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center justify-center gap-2"
      >
        <InputField
          label="Upload Image"
          type={"file"}
          accept="image/*"
          onChange={(e) => handleChangeImage(e)}
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
          className="border border-indigo-300 hover:bg-indigo-300/50 rounded p-1 cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          value="Submit"
          disabled={isSubmitting}
        />
      </form>
      <TrackHistory history={history} />
    </div>
  );
};

export default StressForm;
