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
import { useState, useEffect, useContext } from "react";

import "./submit-exit-form.css";
import FileInput from "./file-input/FileInput";
import { countriesCodesJson } from "../../data/countries-with-codes";
import {
  validateCheckboxes,
  validateLocation,
  getCountryName,
  compileExitData,
  submitExitDataWithoutImage,
  submitExitDataWithImage,
} from "./submit-exit-functions";
import { UserContext } from "../../context/UserContext";

interface Coordinate {
  lat: number;
  lng: number;
}
interface SubmitFormProps {
  latLng: Coordinate | undefined;
  country_code: string | undefined;
  onSuccess: Function;
}
interface Checkbox extends HTMLInputElement {
  checked: boolean;
}

interface CountriesCodesJson {
  [key: string]: string;
}

export default function SubmitExitForm(props: SubmitFormProps) {
  const [units, setUnits] = useState<string>("ft");
  const [formData, setFormData] = useState<FormData>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [sdChecked, setSdChecked] = useState<boolean>(false);
  const [tsChecked, setTsChecked] = useState<boolean>(false);
  const [wsChecked, setWsChecked] = useState<boolean>(false);
  const [lng, setLng] = useState<number>();
  const [lat, setLat] = useState<number>();
  const country_code = props.country_code ? props.country_code : null;
  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";
  const checkboxStyles = {
    "span[class*='checkbox__control']:not([data-disabled])": {
      _checked: { bgColor: txt_500, border: "none" },
    },
  };
  const user = useContext(UserContext);

  useEffect(() => {
    if (!props.latLng) return;
    setLat(props.latLng.lat);
    setLng(props.latLng.lng);
  }, [props.latLng]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    formData: FormData | undefined,
    checkboxes: boolean[],
    country_code: string | null,
    countriesCodesJson: { [key: string]: string },
    units: string
  ) {
    e.preventDefault();
    setErrorMessage(undefined);
    setSuccessMessage(undefined);
    if (!validateCheckboxes(checkboxes)) {
      setErrorMessage("Please select an exit type");
      return;
    }
    if (!validateLocation(country_code)) {
      setErrorMessage("Please choose a valid location");
      return;
    }
    let country_name: string | null;
    country_name = null;
    if (getCountryName(country_code, countriesCodesJson)) {
      country_name = getCountryName(country_code, countriesCodesJson);
    }
    const exit_data = compileExitData(
      e,
      country_code,
      country_name,
      units,
      user[0]._id
    );
    setSubmitting(true);
    try {
      if (!formData) {
        const res = await submitExitDataWithoutImage(exit_data);
        if (res.code === "ERR_NETWORK") throw new Error("Server issue");
        props.onSuccess();
      } else {
        await submitExitDataWithImage(exit_data, formData, user[0]._id);
        props.onSuccess();
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(
        "Error while submitting exit. Please try again or contact us."
      );
    } finally {
      setSubmitting(false);
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
    <form
      className="submit-exit-form"
      onSubmit={(e) =>
        handleSubmit(
          e,
          formData,
          [sdChecked, tsChecked, wsChecked],
          country_code,
          countriesCodesJson,
          units
        )
      }
    >
      <FormControl>
        <FormLabel>Exit Name</FormLabel>
        <Input
          type="text"
          className={inputColorMode}
          name="exit_name"
          maxLength={33}
          required
        />
      </FormControl>
      <FileInput
        updateForm={(formData: FormData) => setFormData(formData)}
        isInvalidFileType={false}
      />
      <Flex className="input-group">
        <FormControl>
          <FormLabel>Type of Object</FormLabel>
          <Select
            placeholder="Select"
            className={inputColorMode}
            name="object_type"
            defaultValue=""
            required
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
            defaultValue=""
            required
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </Select>
        </FormControl>
      </Flex>
      <FormControl isInvalid={!sdChecked && !tsChecked && !wsChecked}>
        <CheckboxGroup>
          <FormLabel>Exit Type</FormLabel>
          <Stack direction="row" className="checkbox-group">
            <Checkbox
              value="sd"
              sx={checkboxStyles}
              name="sd"
              onChange={() => setSdChecked(!sdChecked)}
            >
              Slider down
            </Checkbox>
            <Checkbox
              sx={checkboxStyles}
              name="ts"
              onChange={() => setTsChecked(!tsChecked)}
            >
              Tracking suit
            </Checkbox>
            <Checkbox
              sx={checkboxStyles}
              name="ws"
              onChange={() => setWsChecked(!wsChecked)}
            >
              Wingsuit
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </FormControl>
      <Flex className="input-group">
        <FormControl>
          <FormLabel>Legality</FormLabel>
          <Select
            placeholder="Select"
            className={inputColorMode}
            name="legality"
            defaultValue=""
            required
          >
            <option value="legal">Legal</option>
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
              maxLength={5}
              required
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
              maxLength={5}
              required
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
            name="lat"
            required
            onChange={(e) => {
              setLng(+e.target.value);
            }}
          />
          <FormErrorMessage>Must choose a valid location</FormErrorMessage>
          <FormHelperText>click map to add location</FormHelperText>
        </FormControl>
        <FormControl
          isInvalid={
            country_code
              ? country_code.length > 2 || country_code == undefined
                ? true
                : false
              : false
          }
        >
          <FormLabel>Longitude</FormLabel>
          <Input
            type="number"
            className={inputColorMode}
            value={lng || ""}
            name="lng"
            required
            onChange={(e) => {
              setLng(+e.target.value);
            }}
          />
        </FormControl>
      </Flex>
      <Flex className="input-group">
        <FormControl>
          <FormLabel>City</FormLabel>

          <Input
            type="text"
            className={inputColorMode}
            name="city"
            maxLength={33}
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Region / State</FormLabel>
          <Input
            type="text"
            className={inputColorMode}
            name="region"
            maxLength={33}
            required
          />
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
                maxLength={3}
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
                maxLength={2}
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
            required
          />
        </FormControl>
      </Flex>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Textarea
          className={inputColorMode}
          name="description"
          maxLength={4000}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Access and Approach</FormLabel>
        <Textarea
          className={inputColorMode}
          name="access_approach"
          maxLength={4000}
          required
        />
      </FormControl>
      <FormControl>
        <FormLabel>Landing Area</FormLabel>
        <Textarea
          className={inputColorMode}
          maxLength={4000}
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
