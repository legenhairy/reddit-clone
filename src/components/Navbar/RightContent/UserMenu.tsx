import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { signOut, User } from 'firebase/auth';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/react';
import { FaRedditSquare } from 'react-icons/fa';
import { VscAccount } from 'react-icons/vsc';
import { IoSparkles } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineLogin } from 'react-icons/md';
import { auth } from '@/src/firebase/clientApp';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { authModalState } from '@/src/atoms/authModalAtom';
import { communityState } from '@/src/atoms/communitiesAtom';

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetCommunityState = useResetRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const logout = async () => {
    await signOut(auth);
    // clear community state
    // resetCommunityState();
  };

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{ outline: '1px solid', outlineColor: 'gray.200' }}
      >
        <Flex align="center">
          <Flex align="center">
            {user ? (
              <Flex align="center">
                <Flex align="center">
                  <>
                    <Icon
                      fontSize={24}
                      mr={1}
                      color="gray.300"
                      as={FaRedditSquare}
                    />
                    <Flex
                      direction="column"
                      display={{ base: 'none', lg: 'flex' }}
                      fontSize="8pt"
                      align="flex-start"
                    >
                      <Text fontWeight={700}>
                        {user?.displayName || user.email?.split('@')[0]}
                      </Text>
                      <Flex>
                        <Icon as={IoSparkles} color="brand.100" mr={1} />
                        <Text color="gray.400">1 karma</Text>
                      </Flex>
                    </Flex>
                  </>
                </Flex>
              </Flex>
            ) : (
              <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
            )}
            <ChevronDownIcon />
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: 'blue.500', color: 'white' }}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={CgProfile} />
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: 'blue.500', color: 'white' }}
              onClick={logout}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              fontSize="10pt"
              fontWeight={600}
              _hover={{ bg: 'blue.500', color: 'white' }}
              onClick={() => setAuthModalState({ open: true, view: 'login' })}
            >
              <Flex align="center">
                <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                Log In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
