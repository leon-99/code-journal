### Basic Operations

#### Integer Arithmetic

- **Addition**: Adds two numbers. Example: `5 + 3 = 8`
    - **Binary**: `0101 + 0011 = 1000`
    - **CPU Operation**: The CPU fetches the operands from registers or memory, decodes the ADD instruction, and then uses the arithmetic logic unit (ALU) to perform the addition. The result is then stored back in a register or memory.
- **Subtraction**: Subtracts the second number from the first. Example: `5 - 3 = 2`
    - **Binary**: `0101 - 0011 = 0010`
    - **CPU Operation**: Similar to addition, the CPU fetches the operands, decodes the SUB instruction, and uses the ALU to perform the subtraction. The result is stored back in a register or memory.
- **Multiplication**: Multiplies two numbers. Example: `5 * 3 = 15`
    - **Binary**: `0101 * 0011 = 01111`
    - **CPU Operation**: The CPU fetches the operands, decodes the MUL instruction, and uses the ALU to perform the multiplication. The result is stored back in a register or memory.
- **Division**: Divides the first number by the second. Example: `6 / 3 = 2`
    - **Binary**: `0110 / 0011 = 0010`
    - **CPU Operation**: The CPU fetches the operands, decodes the DIV instruction, and uses the ALU to perform the division. The result is stored back in a register or memory.

#### Logical Operations

- **AND**: Returns true if both operands are true. Example: `true AND false = false`
    - **Binary**: `1 AND 0 = 0`
    - **CPU Operation**: The CPU fetches the operands, decodes the AND instruction, and uses the ALU to perform the logical AND operation. The result is stored back in a register or memory.
- **OR**: Returns true if at least one operand is true. Example: `true OR false = true`
    - **Binary**: `1 OR 0 = 1`
    - **CPU Operation**: The CPU fetches the operands, decodes the OR instruction, and uses the ALU to perform the logical OR operation. The result is stored back in a register or memory.
- **NOT**: Inverts the value of the operand. Example: `NOT true = false`
    - **Binary**: `NOT 1 = 0`
    - **CPU Operation**: The CPU fetches the operand, decodes the NOT instruction, and uses the ALU to perform the logical NOT operation. The result is stored back in a register or memory.
- **XOR**: Returns true if only one of the operands is true. Example: `true XOR false = true`
    - **Binary**: `1 XOR 0 = 1`
    - **CPU Operation**: The CPU fetches the operands, decodes the XOR instruction, and uses the ALU to perform the logical XOR operation. The result is stored back in a register or memory.

#### Bitwise Operations

- **Bitwise AND**: Performs AND operation on each bit. Example: `5 & 3 = 1` (binary: `0101 & 0011 = 0001`)
    - **CPU Operation**: The CPU fetches the operands, decodes the AND instruction, and uses the ALU to perform the bitwise AND operation. The result is stored back in a register or memory.
- **Bitwise OR**: Performs OR operation on each bit. Example: `5 | 3 = 7` (binary: `0101 | 0011 = 0111`)
    - **CPU Operation**: The CPU fetches the operands, decodes the OR instruction, and uses the ALU to perform the bitwise OR operation. The result is stored back in a register or memory.
- **Bitwise NOT**: Inverts each bit. Example: `~5 = -6` (binary: `~0101 = 1010` in 4-bit representation)
    - **CPU Operation**: The CPU fetches the operand, decodes the NOT instruction, and uses the ALU to perform the bitwise NOT operation. The result is stored back in a register or memory.
- **Bitwise XOR**: Performs XOR operation on each bit. Example: `5 ^ 3 = 6` (binary: `0101 ^ 0011 = 0110`)
    - **CPU Operation**: The CPU fetches the operands, decodes the XOR instruction, and uses the ALU to perform the bitwise XOR operation. The result is stored back in a register or memory.
- **Left Shift**: Shifts bits to the left, filling with zeros. Example: `5 << 1 = 10` (binary: `0101 << 1 = 1010`)
    - **CPU Operation**: The CPU fetches the operand, decodes the SHL instruction, and uses the ALU to perform the left shift operation. The result is stored back in a register or memory.
- **Right Shift**: Shifts bits to the right, filling with the sign bit. Example: `5 >> 1 = 2` (binary: `0101 >> 1 = 0010`)
    - **CPU Operation**: The CPU fetches the operand, decodes the SHR instruction, and uses the ALU to perform the right shift operation. The result is stored back in a register or memory.
- **Arithmetic Shift**: Similar to right shift but preserves the sign bit for negative numbers.
    - **CPU Operation**: The CPU fetches the operand, decodes the SAR instruction, and uses the ALU to perform the arithmetic shift operation. The result is stored back in a register or memory.
- **Logical Shift**: Shifts bits to the left or right, filling with zeros regardless of the sign.
    - **CPU Operation**: The CPU fetches the operand, decodes the SHL or SHR instruction, and uses the ALU to perform the logical shift operation. The result is stored back in a register or memory.
- **Rotate Left**: Rotates bits to the left, wrapping around. Example: `5 rol 1 = 10` (binary: `0101 rol 1 = 1010`)
    - **CPU Operation**: The CPU fetches the operand, decodes the ROL instruction, and uses the ALU to perform the rotate left operation. The result is stored back in a register or memory.
- **Rotate Right**: Rotates bits to the right, wrapping around. Example: `5 ror 1 = 10` (binary: `0101 ror 1 = 1010`)
    - **CPU Operation**: The CPU fetches the operand, decodes the ROR instruction, and uses the ALU to perform the rotate right operation. The result is stored back in a register or memory.
