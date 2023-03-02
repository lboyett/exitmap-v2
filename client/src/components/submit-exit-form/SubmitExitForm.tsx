import "./submit-exit-form.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Select,
  Checkbox,
  CheckboxGroup,
  Stack,
  Button,
  Flex,
  Box,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import FileInput from "./file-input/FileInput";
import axios from "axios";

interface Coordinate {
  lat: number;
  lng: number;
}

interface SubmitFormProps {
  latLng: Coordinate | undefined;
  country_code: string | undefined;
}

interface FormInputs extends HTMLFormControlsCollection {
  exit_name: HTMLInputElement;
  object_type: HTMLInputElement;
  sd: HTMLInputElement;
  ts: HTMLInputElement;
  ws: HTMLInputElement;
  experience_required: HTMLInputElement;
  legality: HTMLInputElement;
  bust_factor: HTMLInputElement;
  height_impact: HTMLInputElement;
  height_landing: HTMLInputElement;
  lat: HTMLInputElement;
  lng: HTMLInputElement;
  city: HTMLInputElement;
  hiking_time_hrs: HTMLInputElement;
  hiking_time_mins: HTMLInputElement;
  approach_difficulty: HTMLInputElement;
  description: HTMLInputElement;
  access_approach: HTMLInputElement;
  landing_area: HTMLInputElement;
}

export default function SubmitExitForm(props: SubmitFormProps) {
  const [units, setUnits] = useState<string>("ft");
  const [formData, setFormData] = useState<FormData>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const lat = props.latLng ? props.latLng.lat : undefined;
  const lng = props.latLng ? props.latLng.lng : undefined;
  const country_code = props.country_code ? props.country_code : null;
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const checkboxStyles = {
    "span[class*='checkbox__control']:not([data-disabled])": {
      _checked: { bgColor: txt_500, border: "none" },
    },
  };

  const exitUrl = "http://localhost:8000/exits";
  const imageUrl = "http://localhost:8000/images";
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    const exit_data = {
      name: inputs.exit_name.value,
      object_type: inputs.object_type.value.toLowerCase(),
      exit_type: +`${+inputs.sd.checked}${+inputs.ts.checked}${+inputs.ws
        .checked}`,
      exp_req: inputs.experience_required.value.toLowerCase(),
      legality: inputs.legality.value.toLowerCase(),
      bust_factor: inputs.bust_factor.value,
      height_impact:
        units == "m"
          ? Math.floor(+inputs.height_impact.value * 3.28)
          : Math.floor(+inputs.height_impact.value),
      height_landing:
        units == "m"
          ? Math.floor(+inputs.height_landing.value * 3.28)
          : Math.floor(+inputs.height_landing.value),
      lat: inputs.lat.value,
      lng: inputs.lng.value,
      city: inputs.city.value,
      country_code: country_code,
      hiking_time_hrs: inputs.hiking_time_hrs.value
        ? inputs.hiking_time_hrs.value
        : null,
      hiking_time_mins: inputs.hiking_time_mins.value
        ? inputs.hiking_time_mins.value
        : null,
      approach_diff: +inputs.approach_difficulty.value,
      description: inputs.description.value,
      access_approach: inputs.access_approach.value,
      landing_area: inputs.landing_area.value,
      submitted_by: 1, //USERID
    };
    setSubmitting(true);
    try {
      const exitRes = await axios.post(exitUrl, exit_data);
      const exit = exitRes.data._id;
      formData?.delete("exit");
      formData?.delete("submitted_by");
      formData?.append("exit", exit);
      formData?.append("submitted_by", "1"); //USERID
      const imgRes = await axios.post(imageUrl, formData);
      setSubmitting(false);
      setSuccessMessage("New exit submitted successfully");
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      setErrorMessage("Submission error");
    }
  }

  function changeSliderColor(target: EventTarget & HTMLInputElement) {
    const list = target.classList;
    list.remove("green");
    list.remove("yellow");
    list.remove("red");
    const val = target.value;
    if (val == "0") {
      list.add("green");
    } else if (val == "0.5") {
      list.add("yellow");
    } else {
      list.add("red");
    }
  }

  return (
    <form className="submit-exit-form" onSubmit={(e) => handleSubmit(e)}>
      <FormControl>
        <FormLabel>Exit Name</FormLabel>
        <Input type="text" className={inputColorMode} name="exit_name" />
      </FormControl>
      <FileInput updateForm={(formData: FormData) => setFormData(formData)} />
      <Flex className="input-group">
        <FormControl>
          <FormLabel>Type of Object</FormLabel>
          <Select
            placeholder="Select"
            className={inputColorMode}
            name="object_type"
          >
            <option>Building</option>
            <option>Antenna</option>
            <option>Span</option>
            <option>Earth</option>
            <option>Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Experience Required</FormLabel>
          <Select
            placeholder="Select"
            className={inputColorMode}
            name="experience_required"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </Select>
        </FormControl>
      </Flex>
      <CheckboxGroup>
        <Stack direction="row" className="checkbox-group">
          <Checkbox value="slider_down" sx={checkboxStyles} name="sd">
            Slider down
          </Checkbox>
          <Checkbox value="two_piece" sx={checkboxStyles} name="ts">
            Tracking suit
          </Checkbox>
          <Checkbox value="wingsuit" sx={checkboxStyles} name="ws">
            Wingsuit
          </Checkbox>
        </Stack>
      </CheckboxGroup>
      <Flex className="input-group">
        <FormControl>
          <FormLabel>Legality</FormLabel>
          <Select
            placeholder="Select"
            className={inputColorMode}
            name="legality"
          >
            <option value-="legal">Legal</option>
            <option value="semi">Semi-legal</option>
            <option value="illegal">Illegal</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Bust Factor</FormLabel>
          <input
            type="range"
            min={0}
            max={1}
            defaultValue={0.5}
            onChange={(e) => changeSliderColor(e.target)}
            step={0.5}
            className="input-slider input yellow"
            name="bust_factor"
          />
        </FormControl>
      </Flex>
      <Flex className="input-group">
        <FormControl>
          <FormLabel>Height Until Impact</FormLabel>
          <Flex className="height-div">
            <Input
              type="number"
              className={inputColorMode}
              name="height_impact"
            />
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>Height Until Landing</FormLabel>
          <Flex className="height-div">
            <Input
              type="number"
              className={inputColorMode}
              name="height_landing"
            />
          </Flex>
        </FormControl>
        <Button
          alignSelf="end"
          onClick={() => {
            if (units == "ft") setUnits("m");
            else setUnits("ft");
          }}
        >
          {units}
        </Button>
      </Flex>
      <Flex className="input-group">
        <FormControl
          isInvalid={
            country_code
              ? country_code.length > 2 || country_code == undefined
                ? true
                : false
              : false
          }
        >
          <FormLabel>Latitude</FormLabel>
          <Input
            type="number"
            className={inputColorMode}
            value={lat || ""}
            readOnly
            name="lat"
          />
          <FormErrorMessage>Must choose a valid location</FormErrorMessage>
          <FormHelperText>click map to add location</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Longitude</FormLabel>
          <Input
            type="number"
            className={inputColorMode}
            value={lng || ""}
            readOnly
            name="lng"
          />
        </FormControl>
      </Flex>
      <Flex className="input-group">
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input type="text" className={inputColorMode} name="city" />
        </FormControl>
      </Flex>
      <Flex className="input-group">
        <FormControl>
          <FormLabel>Hiking Time</FormLabel>
          <Flex className="hiking-time-div">
            <Flex>
              <Input
                type="number"
                className={inputColorMode}
                name="hiking_time_hrs"
                min={0}
                pattern="\d*"
              />
              <Box>hrs</Box>
            </Flex>
            <Flex>
              <Input
                type="number"
                className={inputColorMode}
                name="hiking_time_mins"
                min={0}
                pattern="\d*"
              />
              <Box>mins</Box>
            </Flex>
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel>Approach Difficulty</FormLabel>
          <input
            type="range"
            min={0}
            max={1}
            defaultValue={0.5}
            step={0.5}
            onChange={(e) => changeSliderColor(e.target)}
            className="input-slider input yellow"
            name="approach_difficulty"
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea resize="none" className={inputColorMode} name="description" />
      </FormControl>
      <FormControl>
        <FormLabel>Access and Approach</FormLabel>
        <Textarea
          resize="none"
          className={inputColorMode}
          name="access_approach"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Landing Area</FormLabel>
        <Textarea
          resize="none"
          className={inputColorMode}
          name="landing_area"
        />
      </FormControl>
      <Flex className="submit-div">
        <Button type="submit">Submit Exit</Button>
        {submitting ? <Spinner /> : null}
        {successMessage ? <Box>{successMessage}</Box> : null}
        {errorMessage ? <Box color="red">{errorMessage}</Box> : null}
      </Flex>
    </form>
  );
}
