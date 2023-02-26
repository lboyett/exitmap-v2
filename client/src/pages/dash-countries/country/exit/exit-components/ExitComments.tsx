import avatar from "../../../../../assets/avatar.jpeg";
import { Image, Flex, Text, Heading, Box } from "@chakra-ui/react";
import "./exit-comments.css";

function ExitComments(props: any) {
  const comments = props.comments;

  return (
    <div className="comments">
      <Heading as="h2" className="comments-title">
        Comments
      </Heading>
      {comments.map((comment: any, i: number) => {
        return (
          <Flex className="comment" key={i}>
            <Image src={avatar} className="avatar-comments" />
            <Box>
              <Flex alignItems={'center'}>
                <Text className="comment-username">
                  {"@" + comment.username}
                </Text>
                <Text fontWeight={'200'} fontSize='0.8rem'>{comment.created_at}</Text>
              </Flex>
              <Text>{comment.text}</Text>
            </Box>
          </Flex>
        );
      })}
    </div>
  );
}

export default ExitComments;
