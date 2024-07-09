//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ANW
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const anwAbi = [
    { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
    {
        type: 'error',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'allowance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC20InsufficientAllowance',
    },
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'balance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC20InsufficientBalance',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidSpender',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'OwnableInvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'OwnableUnauthorizedAccount',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'spender', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
            { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'spender', internalType: 'address', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AnimalNFT
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const animalNftAbi = [
    {
        type: 'constructor',
        inputs: [{ name: '_zooPassAddress', internalType: 'address', type: 'address' }],
        stateMutability: 'nonpayable',
    },
    { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC721IncorrectOwner',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721InsufficientApproval',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ERC721NonexistentToken',
    },
    {
        type: 'error',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721OutOfBoundsIndex',
    },
    {
        type: 'error',
        inputs: [{ name: 'animalTokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'MaxChildrenReached',
    },
    { type: 'error', inputs: [], name: 'NeedPremiumAccess' },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'OwnableInvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'OwnableUnauthorizedAccount',
    },
    { type: 'error', inputs: [{ name: 'race', internalType: 'string', type: 'string' }], name: 'RaceAlreadyExisting' },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'animal',
                internalType: 'struct AnimalNFT.Animal',
                type: 'tuple',
                components: [
                    { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
                    {
                        name: 'race',
                        internalType: 'struct AnimalNFT.Race',
                        type: 'tuple',
                        components: [
                            { name: 'id', internalType: 'string', type: 'string' },
                            { name: 'maxChildrenCount', internalType: 'uint256', type: 'uint256' },
                            { name: 'metadataUri', internalType: 'string', type: 'string' },
                            { name: 'isPremium', internalType: 'bool', type: 'bool' },
                        ],
                    },
                    { name: 'childCount', internalType: 'uint256', type: 'uint256' },
                    { name: 'gender', internalType: 'enum AnimalNFT.Gender', type: 'uint8' },
                ],
                indexed: false,
            },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'AnimalCreated',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'parentA', internalType: 'uint256', type: 'uint256', indexed: false },
            { name: 'parentB', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Breed',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
            { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'race',
                internalType: 'struct AnimalNFT.Race',
                type: 'tuple',
                components: [
                    { name: 'id', internalType: 'string', type: 'string' },
                    { name: 'maxChildrenCount', internalType: 'uint256', type: 'uint256' },
                    { name: 'metadataUri', internalType: 'string', type: 'string' },
                    { name: 'isPremium', internalType: 'bool', type: 'bool' },
                ],
                indexed: false,
            },
        ],
        name: 'RaceCreated',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'tokenIdA', internalType: 'uint256', type: 'uint256' },
            { name: 'tokenIdB', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'breedAnimals',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: '_raceId', internalType: 'string', type: 'string' },
            { name: '_maxChildrenCount', internalType: 'uint256', type: 'uint256' },
            { name: '_metadataUri', internalType: 'string', type: 'string' },
            { name: '_isPremium', internalType: 'bool', type: 'bool' },
        ],
        name: 'createNewRace',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getAnimal',
        outputs: [
            {
                name: '',
                internalType: 'struct AnimalNFT.Animal',
                type: 'tuple',
                components: [
                    { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
                    {
                        name: 'race',
                        internalType: 'struct AnimalNFT.Race',
                        type: 'tuple',
                        components: [
                            { name: 'id', internalType: 'string', type: 'string' },
                            { name: 'maxChildrenCount', internalType: 'uint256', type: 'uint256' },
                            { name: 'metadataUri', internalType: 'string', type: 'string' },
                            { name: 'isPremium', internalType: 'bool', type: 'bool' },
                        ],
                    },
                    { name: 'childCount', internalType: 'uint256', type: 'uint256' },
                    { name: 'gender', internalType: 'enum AnimalNFT.Gender', type: 'uint8' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: '_addr', internalType: 'address', type: 'address' }],
        name: 'getAnimalsForAddress',
        outputs: [
            {
                name: '',
                internalType: 'struct AnimalNFT.Animal[]',
                type: 'tuple[]',
                components: [
                    { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
                    {
                        name: 'race',
                        internalType: 'struct AnimalNFT.Race',
                        type: 'tuple',
                        components: [
                            { name: 'id', internalType: 'string', type: 'string' },
                            { name: 'maxChildrenCount', internalType: 'uint256', type: 'uint256' },
                            { name: 'metadataUri', internalType: 'string', type: 'string' },
                            { name: 'isPremium', internalType: 'bool', type: 'bool' },
                        ],
                    },
                    { name: 'childCount', internalType: 'uint256', type: 'uint256' },
                    { name: 'gender', internalType: 'enum AnimalNFT.Gender', type: 'uint8' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getLastTokenId',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: '_raceId', internalType: 'string', type: 'string' }],
        name: 'getRaceById',
        outputs: [
            {
                name: 'race',
                internalType: 'struct AnimalNFT.Race',
                type: 'tuple',
                components: [
                    { name: 'id', internalType: 'string', type: 'string' },
                    { name: 'maxChildrenCount', internalType: 'uint256', type: 'uint256' },
                    { name: 'metadataUri', internalType: 'string', type: 'string' },
                    { name: 'isPremium', internalType: 'bool', type: 'bool' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getRaces',
        outputs: [
            {
                name: '',
                internalType: 'struct AnimalNFT.Race[]',
                type: 'tuple[]',
                components: [
                    { name: 'id', internalType: 'string', type: 'string' },
                    { name: 'maxChildrenCount', internalType: 'uint256', type: 'uint256' },
                    { name: 'metadataUri', internalType: 'string', type: 'string' },
                    { name: 'isPremium', internalType: 'bool', type: 'bool' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
    {
        type: 'function',
        inputs: [{ name: '_raceId', internalType: 'string', type: 'string' }],
        name: 'safeMintAnimal',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'zooPass',
        outputs: [{ name: '', internalType: 'contract ERC721', type: 'address' }],
        stateMutability: 'view',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165Abi = [
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
    {
        type: 'error',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'allowance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC20InsufficientAllowance',
    },
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'balance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC20InsufficientBalance',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidSpender',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'spender', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'spender', internalType: 'address', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC721IncorrectOwner',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721InsufficientApproval',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ERC721NonexistentToken',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Burnable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721BurnableAbi = [
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC721IncorrectOwner',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721InsufficientApproval',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ERC721NonexistentToken',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721EnumerableAbi = [
    { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC721IncorrectOwner',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721InsufficientApproval',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ERC721NonexistentToken',
    },
    {
        type: 'error',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721OutOfBoundsIndex',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsAbi = [
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'balance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC1155InsufficientBalance',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC1155InvalidApprover',
    },
    {
        type: 'error',
        inputs: [
            { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
            { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC1155InvalidArrayLength',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC1155InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC1155InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC1155InvalidSender',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC1155MissingApprovalForAll',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165Abi = [
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20Abi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'spender', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'spender', internalType: 'address', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsAbi = [
    {
        type: 'error',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'allowance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC20InsufficientAllowance',
    },
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'balance', internalType: 'uint256', type: 'uint256' },
            { name: 'needed', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC20InsufficientBalance',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
        name: 'ERC20InvalidSpender',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MetadataAbi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'spender', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'spender', internalType: 'address', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'spender', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'decimals',
        outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transfer',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721Abi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Enumerable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721EnumerableAbi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenByIndex',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'index', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsAbi = [
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC721IncorrectOwner',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721InsufficientApproval',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ERC721NonexistentToken',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Metadata
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721MetadataAbi = [
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ReceiverAbi = [
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'onERC721Received',
        outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Marketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const marketplaceAbi = [
    {
        type: 'constructor',
        inputs: [{ name: '_animalNftContract', internalType: 'contract ERC721', type: 'address' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'bid',
                internalType: 'struct Marketplace.Bid',
                type: 'tuple',
                components: [
                    { name: 'animalId', internalType: 'uint256', type: 'uint256' },
                    { name: 'price', internalType: 'uint256', type: 'uint256' },
                    { name: 'owner', internalType: 'address', type: 'address' },
                ],
                indexed: false,
            },
            { name: 'buyer', internalType: 'address', type: 'address', indexed: false },
        ],
        name: 'Bought',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'action', internalType: 'enum Marketplace.MarketplaceAction', type: 'uint8', indexed: false },
            {
                name: 'bid',
                internalType: 'struct Marketplace.Bid',
                type: 'tuple',
                components: [
                    { name: 'animalId', internalType: 'uint256', type: 'uint256' },
                    { name: 'price', internalType: 'uint256', type: 'uint256' },
                    { name: 'owner', internalType: 'address', type: 'address' },
                ],
                indexed: false,
            },
            { name: 'sender', internalType: 'address', type: 'address', indexed: false },
            { name: 'date', internalType: 'uint256', type: 'uint256', indexed: false },
        ],
        name: 'MarketplaceChange',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'bid',
                internalType: 'struct Marketplace.Bid',
                type: 'tuple',
                components: [
                    { name: 'animalId', internalType: 'uint256', type: 'uint256' },
                    { name: 'price', internalType: 'uint256', type: 'uint256' },
                    { name: 'owner', internalType: 'address', type: 'address' },
                ],
                indexed: false,
            },
            { name: 'seller', internalType: 'address', type: 'address', indexed: false },
        ],
        name: 'OnSale',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'bid',
                internalType: 'struct Marketplace.Bid',
                type: 'tuple',
                components: [
                    { name: 'animalId', internalType: 'uint256', type: 'uint256' },
                    { name: 'price', internalType: 'uint256', type: 'uint256' },
                    { name: 'owner', internalType: 'address', type: 'address' },
                ],
                indexed: false,
            },
        ],
        name: 'RemoveFromSale',
    },
    {
        type: 'function',
        inputs: [{ name: '_animalId', internalType: 'uint256', type: 'uint256' }],
        name: 'buy',
        outputs: [],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        inputs: [{ name: '_animalId', internalType: 'uint256', type: 'uint256' }],
        name: 'getBidForAnimalId',
        outputs: [
            {
                name: 'bid',
                internalType: 'struct Marketplace.Bid',
                type: 'tuple',
                components: [
                    { name: 'animalId', internalType: 'uint256', type: 'uint256' },
                    { name: 'price', internalType: 'uint256', type: 'uint256' },
                    { name: 'owner', internalType: 'address', type: 'address' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'getBids',
        outputs: [
            {
                name: '',
                internalType: 'struct Marketplace.Bid[]',
                type: 'tuple[]',
                components: [
                    { name: 'animalId', internalType: 'uint256', type: 'uint256' },
                    { name: 'price', internalType: 'uint256', type: 'uint256' },
                    { name: 'owner', internalType: 'address', type: 'address' },
                ],
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'onERC721Received',
        outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: '_animalId', internalType: 'uint256', type: 'uint256' },
            { name: '_price', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'putOnSale',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: '_animalId', internalType: 'uint256', type: 'uint256' }],
        name: 'removeFromSale',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathAbi = [{ type: 'error', inputs: [], name: 'MathOverflowedMulDiv' }] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Ownable
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownableAbi = [
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'OwnableInvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'OwnableUnauthorizedAccount',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
            { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
    {
        type: 'function',
        inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
    {
        type: 'error',
        inputs: [
            { name: 'value', internalType: 'uint256', type: 'uint256' },
            { name: 'length', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'StringsInsufficientHexLength',
    },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZooPass
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const zooPassAbi = [
    { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
    {
        type: 'error',
        inputs: [
            { name: 'sender', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'owner', internalType: 'address', type: 'address' },
        ],
        name: 'ERC721IncorrectOwner',
    },
    {
        type: 'error',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'ERC721InsufficientApproval',
    },
    {
        type: 'error',
        inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidApprover',
    },
    {
        type: 'error',
        inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOperator',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidReceiver',
    },
    {
        type: 'error',
        inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
        name: 'ERC721InvalidSender',
    },
    {
        type: 'error',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ERC721NonexistentToken',
    },
    {
        type: 'error',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'OwnableInvalidOwner',
    },
    {
        type: 'error',
        inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
        name: 'OwnableUnauthorizedAccount',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address', indexed: true },
            { name: 'operator', internalType: 'address', type: 'address', indexed: true },
            { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'previousOwner', internalType: 'address', type: 'address', indexed: true },
            { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            { name: 'from', internalType: 'address', type: 'address', indexed: true },
            { name: 'to', internalType: 'address', type: 'address', indexed: true },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: true },
        ],
        name: 'Transfer',
    },
    {
        type: 'function',
        inputs: [
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'burn',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: '_to', internalType: 'address', type: 'address' }],
        name: 'buyZooPass',
        outputs: [],
        stateMutability: 'payable',
    },
    {
        type: 'function',
        inputs: [{ name: '_newPriceInWei', internalType: 'uint256', type: 'uint256' }],
        name: 'changeZooPrice',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'getApproved',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'owner', internalType: 'address', type: 'address' },
            { name: 'operator', internalType: 'address', type: 'address' },
        ],
        name: 'isApprovedForAll',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
        stateMutability: 'view',
    },
    { type: 'function', inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable' },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'data', internalType: 'bytes', type: 'bytes' },
        ],
        name: 'safeTransferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [
            { name: 'operator', internalType: 'address', type: 'address' },
            { name: 'approved', internalType: 'bool', type: 'bool' },
        ],
        name: 'setApprovalForAll',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
        name: 'supportsInterface',
        outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', internalType: 'string', type: 'string' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        inputs: [
            { name: 'from', internalType: 'address', type: 'address' },
            { name: 'to', internalType: 'address', type: 'address' },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
        ],
        name: 'transferFrom',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        inputs: [],
        name: 'zooPassPrice',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
        stateMutability: 'view',
    },
] as const
