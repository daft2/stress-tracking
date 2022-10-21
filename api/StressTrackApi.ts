import axios from "axios";
import { StressProps } from "../components/StressForm";
import { supabase } from "../lib/supabaseClient";

type InsertProp = {
  values: StressProps;
  image: File;
};

const StressTrackApi = {
  create: async (props: InsertProp) => {
    if (props.image?.size > 2200000)
      return { sizeError: "Error Image limit is 2MB" };

    const date = Date.now();
    const strDate = date.toString();
    const { data: imgData, error: imgError } = await supabase.storage
      .from("mooca")
      .upload("public/" + strDate + props.image?.name, props.image as File);

    if (imgError) return { imgData, imgError };

    const params = {
      ...props.values,
      image_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/mooca/${imgData.path}`,
    };

    const { data, error } = await supabase
      .from("track")
      .insert(params)
      .select();

    return { data, error };
  },
  getAll: async () => {
    const { data, error } = await supabase.from("track").select("*");

    return { data, error };
  },
  test: async () => {
    return axios.get(
      "https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books"
    );
  },
};

export default StressTrackApi;
