// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract WMDB is Ownable {
    uint256 private iterableId = 0;

    struct web3mdb {
        uint256 id;
        string url;
    }

    web3mdb[] private wmdb;

    // Emitted when the stored value changes
    event ValueChanged(string newValue);

    // Stores a new value in the contract
    function store(string memory newValue) public onlyOwner {
        web3mdb memory newMovie = web3mdb({id: iterableId, url: newValue});
        wmdb.push(newMovie);
        iterableId++;
        emit ValueChanged(newValue);
    }

    // Retrieve all stored movies
    function retrieveAll() public view returns (web3mdb[] memory) {
        return wmdb;
    }

    // Retrieve specific movie by ID
    function retrieveOne(uint256 id) public view returns (string memory) {
        return wmdb[id].url;
    }
}
