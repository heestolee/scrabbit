import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  Box,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { TooltipButton } from "@/components/guide/TooltipButton";

export const GuidePopover = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverOpen = () => setIsPopoverOpen(true);
  const handlePopoverClose = () => setIsPopoverOpen(false);

  return (
    <Popover onOpen={handlePopoverOpen} onClose={handlePopoverClose}>
      <PopoverTrigger>
        <TooltipButton isTooltipDisabled={isPopoverOpen} onClick={() => {}} />
      </PopoverTrigger>

      <PopoverContent
        borderRadius="15px"
        boxShadow="md"
        width="38rem"
        padding="10px"
        backgroundColor="white"
        zIndex="10"
        style={{
          position: "absolute",
          top: "40px",
          right: "-40px",
        }}
        fontFamily="'Malgun Gothic', sans-serif"
      >
        <PopoverArrow />
        <PopoverCloseButton right="1px" />
        <PopoverBody>
          <Box fontSize="sm" lineHeight="1.1" textAlign="left">
            <Box
              fontWeight="bold"
              boxShadow="lg"
              p="4"
              borderRadius="md"
              bg="blue.100"
              mb="2"
            >
              <Text fontSize="xl" fontWeight="bold" mb="4" color="#343394">
                1. 메인화면
              </Text>
              <Text fontSize="md" mb="2">
                “입력한 웹사이트의 내용을 불러옵니다.”
              </Text>
            </Box>
            <Text fontWeight="bold" mb="2" color="#343394">
              1-1. 선택 모드 설명:
            </Text>
            <UnorderedList mb="4" pl="6">
              <ListItem mb="2">
                <strong>전체 선택:</strong> 입력한 주소에 해당하는 전체 페이지를
                그대로 새로 생성합니다.
              </ListItem>
              <ListItem>
                <strong>부분 선택:</strong> 페이지의 특정 부분만 선택하여
                페이지를 생성할 수 있습니다.
              </ListItem>
            </UnorderedList>

            <Text fontWeight="bold" mb="2" color="#343394">
              1-2. 입력창에 주소 입력:
            </Text>
            <UnorderedList mb="6" pl="6">
              <ListItem>입력창에 불러올 웹사이트의 주소를 입력하세요.</ListItem>
              <ListItem>“https://www.”가 포함된 주소를 입력해주세요.</ListItem>
              <ListItem>
                입력 후 “페이지 불러오기” 버튼을 클릭하면 페이지를 불러옵니다.
              </ListItem>
            </UnorderedList>

            <Box
              fontWeight="bold"
              boxShadow="lg"
              p="4"
              borderRadius="md"
              bg="blue.100"
              mb="2"
            >
              <Text fontSize="xl" fontWeight="bold" mb="4" color="#343394">
                2. 불러온 페이지 화면
              </Text>
              <Text fontSize="md" mb="2">
                “선택한 내용을 구성으로 한 웹사이트를 생성할 수 있습니다.”
              </Text>
              <Text fontSize="md" mb="4">
                “미리보기로 구성을 미리 확인할 수 있습니다.”
              </Text>
            </Box>

            <Text fontWeight="bold" mb="2" color="#343394">
              2-1. 선택모드에 따른 페이지 생성 방식:
            </Text>
            <UnorderedList mb="4" pl="6">
              <ListItem mb="2">
                <strong>전체 선택:</strong> 가져온 페이지를 그대로
                생성합니다.(미리보기 제공 X)
              </ListItem>
              <ListItem>
                <strong>부분 선택:</strong> 취사선택한 내용을 구성으로 페이지를
                생성합니다.
                <UnorderedList>
                  <ListItem>
                    구성에 포함할 내용에 마우스를 이동시키면 선택 범위를 확인할
                    수 있습니다.
                  </ListItem>
                  <ListItem>
                    생성될 페이지의 미리보기는 오른쪽 영역에서 확인 가능합니다.
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </UnorderedList>

            <Text fontWeight="bold" mb="2" color="#343394">
              2-2. 서브도메인 입력 및 배포:
            </Text>
            <UnorderedList pl="6">
              <ListItem>생성 버튼 왼쪽의 서브도메인 입력을 합니다.</ListItem>
              <ListItem>
                입력 후 “페이지 생성하기” 버튼을 클릭하면 배포가 완료됩니다.
              </ListItem>
              <ListItem>이미 사용된 서브도메인은 사용할 수 없습니다.</ListItem>
              <ListItem>
                등록에는 약간의 시간이 소요될 수 있습니다. (최대 2분)
              </ListItem>
            </UnorderedList>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
