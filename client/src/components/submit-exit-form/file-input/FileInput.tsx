import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Box,
  useColorModeValue,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";
import React, {
  useRef,
  useState,
  useEffect,
  SyntheticEvent,
  DragEvent as DE,
} from "react";
import "./file-input.css";
import axios, { AxiosError, AxiosResponse } from "axios";

interface FileInputProps {
  updateForm: Function;
  isInvalidFileType: boolean;
}

export default function FileInput({
  updateForm,
  isInvalidFileType,
}: FileInputProps) {
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState<FormData>();
  const [borderColor, setBorderColor] = useState<string>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileInvalid, setFileInvalid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const txt_500 = useColorModeValue("txt_light.500", "txt_dark.500");
  const lightMode = useColorModeValue(true, false);
  const inputMode = lightMode ? "input-light" : "input-dark";

  async function handleFile(e: any) {
    setBorderColor(undefined);
    setErrorMessage("");
    if (e.type === "drop") {
      var file = e.dataTransfer.files[0];
    } else if (e.type === "change") {
      var file = e.target.files[0];
    } else return;
    if (!validateFileIsImage(file)) {
      setFileInvalid(true);
      setErrorMessage(
        `Please chooose a valid file type (jpeg, png, webp, avif, svg)`
      );
      setFileName("");
      setFormData(undefined);
      return;
    }
    try {
      const res = (await validateFileOnServer(file)) as
        | AxiosError
        | AxiosResponse;
      if (res instanceof AxiosError) throw res;
      setFileInvalid(false);
      setFileName(file.name);
      const formData = new FormData();
      formData.append("image", file);
      setFormData(formData);
      return;
    } catch (err: any) {
      setFileInvalid(true);
      if (err.response.status === 415) {
        setErrorMessage(
          `Please chooose a valid file type (jpeg, png, webp, avif, svg)`
        );
      } else if (err.response.status === 413) {
        setErrorMessage(`Please chooose a file less than 10 MB`);
      }
      setFileName("");
      setFormData(undefined);
      return;
    }
  }

  useEffect(() => {
    updateForm(formData);
  }, [formData]);

  function validateFileIsImage(file: File) {
    const mimeTypes = [
      "image/avif",
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/webp",
    ];
    if (!mimeTypes.includes(file.type)) {
      return false;
    }
    return true;
  }

  async function validateFileOnServer(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    const url = "http://localhost:8000/utilities/validate-file";
    try {
      const res = await axios.post(url, formData);
      return res;
    } catch (err) {
      return err as AxiosError;
    }
  }

  return (
    <FormControl isInvalid={fileInvalid ? true : false}>
      <FormLabel>Upload Image</FormLabel>
      <Input
        type="file"
        ref={fileInput}
        display="none"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleFile(e);
        }}
      />
      <Input
        as="div"
        className={`input-div ${inputMode}`}
        color={borderColor}
        borderColor={
          fileInvalid ? "red !important" : `${borderColor} !important`
        }
        onDrop={(e) => handleFile(e)}
        onDragOver={(e) => {
          setBorderColor(txt_500);
          e.preventDefault();
          e.stopPropagation();
        }}
        onDragExit={() => {
          setBorderColor(undefined);
        }}
        onDragLeave={() => {
          setBorderColor(undefined);
        }}
        isInvalid={fileInvalid}
      >
        <Box>{fileName}</Box>
        <Button
          type={"button"}
          onClick={() => {
            if (fileInput.current) fileInput.current.click();
          }}
        >
          Choose File
        </Button>
      </Input>
      <Flex gap="1rem">
        <FormHelperText>drag and drop an image file</FormHelperText>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      </Flex>
    </FormControl>
  );
}
