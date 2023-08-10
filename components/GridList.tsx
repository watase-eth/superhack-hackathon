import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcAbout,
  FcAssistant,
  FcBinoculars,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function gridListWith() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Short heading
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          obcaecati ut cupiditate pariatur, dignissimos, placeat amet officiis.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Courses"}
            icon={<Icon as={FcBinoculars} w={10} h={10} />}
            description={
              "Delve into a diverse range of subjects. From technology to humanities, there's a course tailored for you."
            }
            href={"#"}
          />
          <Card
            heading={"Community"}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              "Connect with fellow learners, share insights, and grow together in our vibrant MintEd community"
            }
            href={"#"}
          />
          <Card
            heading={"Support"}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              "Questions or concerns? Our dedicated team is here to assist, ensuring a smooth learning experience."
            }
            href={"#"}
          />
          <Card
            heading={"Achievements"}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              "Showcase your progress and achievements with our integrated dashboard. Track, flaunt, and mint your success."
            }
            href={"#"}
          />
          <Card
            heading={"Resources"}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              "Access a plethora of resources, from study guides to expert interviews, enhancing your learning journey."
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
