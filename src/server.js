const { createClient } = require("@supabase/supabase-js");
const express = require("express");
const PORT = process.env.PORT || 3001;
const cors = require("cors");
require("dotenv").config();

const app = express();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

app.use(express.json());

app.use(cors());

app.get("/server", async (req, res) => {
  try {
    const { data: vehicles, error: vehicleError } = await supabase
      .from("vehicle")
      .select("*");
    const { data: cars, error: carError } = await supabase.from("car").select("*");

    if (vehicleError || carError) {
      console.log(vehicleError || carError);
      return res.status(500).send("Error getting form data!");
    }

    res.json({ vehicles, cars });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error getting form data!");
  }
});

app.post("/server", async (req, res) => {
  try {
    const { error } = await supabase.from("vehicle").insert([req.body]);
    if (error) {
      console.log(error);
      return res.status(500).send("Error saving form data!");
    }
    console.log("Form data saved successfully!");
    res.status(201).send("Saved");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving form data!");
  }
});

app.listen(PORT, () => {
  console.log("Server started on port 3001");
});
