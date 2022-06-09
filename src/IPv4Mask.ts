import { ArgumentException, FormatException, ParseException } from "../deps.ts";

import type { IPv4BitArray, IPv4Octets } from "./types.ts";

export class IPv4Mask {
  public static fromPrefix(prefix: number): IPv4Mask {
    if (prefix < 0 || prefix > 32) {
      throw new ArgumentException(
        `Invalid IPv4 network CIDR prefix: ${prefix}. Value MUST be inclusively between 0 and 32.`,
      );
    }

    const networkByteStr = "1".repeat(prefix);
    const byteStr = `${networkByteStr}${"0".repeat(32 - networkByteStr.length)}`
      .split("");
    const octets = [];

    while (byteStr.length) {
      const bits = byteStr.splice(0, 8);
      const byte = bits.join("");
      const decVal = parseInt(byte, 2);
      
      octets.push(decVal);
    }

    return new IPv4Mask(octets[0], octets[1], octets[2], octets[3]);
  }

  public static fromBits(bits: IPv4BitArray): IPv4Mask {
    if (bits.length !== 32) {
      throw new ArgumentException(
        `IPv4BitArray MUST be 32 bits long. Received ${bits.length}.`,
      );
    }

    const first0 = bits.indexOf(0);
    const last1 = bits.lastIndexOf(1);

    if (first0 !== -1 && first0 < last1) {
      throw new ArgumentException(
        `Invalid IPv4 mask bits. Found a 1 following a 0 at bit ${first0 + 1}.`,
      );
    }

    const octets = [];

    while (bits.length) {
      const byte = bits.splice(0, 8);
      const byteStr = byte.join("");
      const decVal = parseInt(byteStr, 2);
      octets.push(decVal);
    }

    return new IPv4Mask(octets[0], octets[1], octets[2], octets[3]);
  }

  public static parseIPv4Mask(subnetMask: string) {
    const parts = subnetMask.split(".");
    const octets = parts.map((p) => parseInt(p, 10));

    if (octets.length !== 4) {
      throw new ParseException(
        `Failed to parse provided subnet mask string: ${subnetMask}`,
      );
    }

    return new IPv4Mask(octets[0], octets[1], octets[2], octets[3]);
  }

  public get octets(): IPv4Octets {
    return [...this._octets];
  }

  public get bits(): IPv4BitArray {
    return [...this._bits];
  }

  public get prefix(): number {
    const index = this.bits.indexOf(0);

    return index === -1 ? 32 : index;
  }

  protected _octets: IPv4Octets;
  protected _bits: IPv4BitArray;

  constructor(oct1: number, oct2: number, oct3: number, oct4: number) {
    const octets: IPv4Octets = [oct1, oct2, oct3, oct4];
    let bits: number[] = [];
    octets.forEach((o, i) => {
      if (o < 0 || 0 > 255) {
        throw new ArgumentException(
          `Bad value for argument ${
            i + 1
          }, ${o}. Value MUST be inclusively between 0 and 255.`,
        );
      }
      const bin = o.toString(2);
      const byte = `${"0".repeat(8 - bin.length)}${bin}`;
      bits = bits.concat(...byte.split("").map((b) => parseInt(b)));
    });

    const first0 = bits.indexOf(0);
    const last1 = bits.lastIndexOf(1);

    if (first0 !== -1 && last1 > first0) {
      throw new FormatException(
        `Invalid IPv4 mask created from provided arguments: ${
          octets.join(".")
        }.`,
      );
    }

    this._octets = octets;
    this._bits = bits as IPv4BitArray;
  }

  public toString(): string {
    return this._octets.join(".");
  }

  public valueOf(): number {
    const bitStr = this.bits.join("");
    const binValue = parseInt(bitStr, 2);

    return binValue;
  }
}
