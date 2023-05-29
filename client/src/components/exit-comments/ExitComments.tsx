import avatar from "../../assets/avatar.jpeg";
import {
  Image,
  Flex,
  Text,
  Box,
  FormControl,
  useColorModeValue,
  Textarea,
  Button,
  Spinner,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import "./exit-comments.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BiCommentAdd } from "react-icons/bi";
import { formatDistance, startOfSecond } from "date-fns";
import { UserContext } from "../../context/UserContext";
import AvatarComp from "../avatar/AvatarComp";

export interface commentsTypes {
  author: number;
  comment: string;
  comment_created_at: string;
  exit: number;
  is_deleted: boolean;
  updated_at: string;
  _id: number;
}

interface FormInputs extends HTMLFormControlsCollection {
  new_comment: HTMLInputElement;
}

interface ExitCommentsPropTypes {
  comments: commentsTypes[] | undefined;
  exit_id: string | undefined;
  getExit: Function;
}

function ExitComments(props: ExitCommentsPropTypes) {
  const [addCommentButton, setAddCommentButton] = useState("");
  const [hideIcon, setHideIcon] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [numComments, setNumComments] = useState(3);
  const user = useContext(UserContext);
  const comments = props.comments;
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const lightMode = useColorModeValue(true, false);
  const inputColorMode = lightMode ? "input-light" : "input-dark";

  function showAddCommentButton() {
    if (addCommentButton === "") {
      setAddCommentButton("active");
      setHideIcon("inactive");
    } else {
      setAddCommentButton("");
      setHideIcon("");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);
    const target = e.target as HTMLFormElement;
    const inputs = target.elements as FormInputs;
    const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/comments`;
    try {
      if (!inputs.new_comment.value) throw Error("Please type a comment.");
      await axios.post(
        url,
        {
          comment: inputs.new_comment.value,
          exit_id: props.exit_id,
          author_id: user[0]._id,
        },
        { withCredentials: true }
      );
      props.getExit();
      showAddCommentButton();
      inputs.new_comment.value = "";
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  function showMoreComments() {
    setNumComments(numComments + 3);
  }

  function showLessComments() {
    setNumComments(3);
  }

  async function deleteComment(id: number) {
    setLoading(true);
    const url = `${import.meta.env.VITE_SERVER_DOMAIN_NAME}/comments/${id}`;
    try {
      await axios.delete(url, {withCredentials: true});
      props.getExit();
    } catch (err) {
      toast({
        title: "Error",
        description: "Please try again or contact us.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  if (!comments) {
    return <></>;
  } else {
    return (
      <div className="comments">
        <Flex className="comments-title-container">
          {user[0]._id === 18 ? null : (
            <BiCommentAdd
              className={`add-comment-icon  ${hideIcon}`}
              onClick={showAddCommentButton}
            />
          )}
          <Flex className={`comment-button-container  ${addCommentButton}`}>
            {submitting ? <Spinner /> : null}
            <Text color="red">{errorMessage ? errorMessage : null}</Text>
            <Text onClick={showAddCommentButton} cursor="pointer">
              Cancel
            </Text>
            <Button
              type="submit"
              form="comment-form"
              className={`comment-button`}
            >
              Post
            </Button>
          </Flex>
        </Flex>

        <form
          id="comment-form"
          className={`comment-form  ${addCommentButton}`}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <FormControl>
            <Textarea
              resize="none"
              className={inputColorMode}
              name="new_comment"
            />
          </FormControl>
        </form>

        {comments
          .sort((a, b) =>
            b.comment_created_at.localeCompare(a.comment_created_at)
          )
          .slice(0, numComments)
          .map((comment: any, i: number) => {
            let isAuthor = false;
            if (comment.author === user[0]._id) {
              isAuthor = true;
            }
            return (
              <Flex className="comment" key={i}>
                <AvatarComp
                  userId={comment.author}
                  className="avatar-comments"
                />
                <Box flexGrow={1}>
                  <Flex alignItems={"center"}>
                    <Text className="comment-username">
                      {"@" + comment.username}
                    </Text>
                    <Text fontWeight={"200"} fontSize="0.8rem">
                      {formatDistance(
                        new Date(comment.comment_created_at),
                        startOfSecond(Date.now()),
                        { addSuffix: true }
                      )}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text p="0">{comment.comment}</Text>
                    <Spacer />
                    {isAuthor ? (
                      loading ? (
                        <Spinner />
                      ) : (
                        <Button
                          p="0 0.5rem"
                          height="min-content"
                          onClick={() => {
                            deleteComment(comment.comment_id);
                          }}
                        >
                          Delete
                        </Button>
                      )
                    ) : null}
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        {comments.length > 3 && numComments < comments.length ? (
          <Button className="more-comments-button" onClick={showMoreComments}>
            View more comments
          </Button>
        ) : null}
        {numComments >= comments.length && comments.length > 3 ? (
          <Button className="more-comments-button" onClick={showLessComments}>
            View less comments
          </Button>
        ) : null}
      </div>
    );
  }
}

export default ExitComments;
