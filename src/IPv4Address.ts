import { ArgumentException, ParseException } from "../deps.ts";

import type { IPv4BitArray, IPv4Octets } from "./types.ts";

import { IPv4Mask } from "./IPv4Mask.ts";
import { IPv4Network } from "./IPv4Network.ts";
import { IPv4Range } from "./IPv4Range.ts";

import {
  IP_CLASS_DEFAULT_MASKS,
  IP_CLASS_RANGES,
  RFC1122_LOOPBACK,
  RFC1918_PRIVATE_ADDRESSES,
  RFC3927_LINK_LOCAL,
} from "./_local_constants.ts";

export class IPv4Address {
  public static parseIPv4(ip: string): IPv4Address {
    const parts = ip.split(".");
    const octets = parts.map((p) => parseInt(p, 10));

    if (octets.length !== 4) {
      throw new ParseException(`Invalid IP address string: ${ip}.`);
    }

    return new IPv4Address(octets[0], octets[1], octets[2], octets[3]);
  }

  public static fromBits(bits: IPv4BitArray): IPv4Address {
    if (bits.length !== 32) {
      throw new ArgumentException(
        `IPv4BitArray MUST be 32 bits long. Received ${bits.length}.`,
      );
    }

    const octets = [];

    bits.forEach((b, i) => {
      if (!(b === 0 || b === 1)) {
        throw new ArgumentException(
          `IPv4BitArray MUST only contain 1 or 0s. Received ${b} at bit ${
            i + 1
          }.`,
        );
      }
    });
    const bitCopy = [...bits];

    while (bitCopy.length) {
      const byte = bitCopy.splice(0, 8);
      const byteStr = byte.join("");
      const decVal = parseInt(byteStr, 2);

      octets.push(decVal);
    }

    return new IPv4Address(octets[0], octets[1], octets[2], octets[3]);
  }

  public static fromValue(value: number): IPv4Address {
    const bitStr = value.toString(2);
    const allBitStr = `${"0".repeat(32 - bitStr.length)}${bitStr}`;
    const bits = allBitStr.split("").map((b) => parseInt(b)) as IPv4BitArray;

    return IPv4Address.fromBits(bits);
  }

  public get isAPIPA(): boolean {
    return this.inRange(RFC3927_LINK_LOCAL);
  }

  public get isLoopBack(): boolean {
    return this.inRange(RFC1122_LOOPBACK);
  }

  public get isPrivate(): boolean {
    return RFC1918_PRIVATE_ADDRESSES.some((r) => this.inRange(r));
  }

  public get className(): string {
    for (const key in IP_CLASS_RANGES) {
      const className = key as keyof typeof IP_CLASS_RANGES;
      const range = IP_CLASS_RANGES[className];

      if (this.inRange(range)) {
        return key;
      }
    }

    return "";
  }

  public get defaultMask(): IPv4Mask | undefined {
    const className = this.className as keyof typeof IP_CLASS_DEFAULT_MASKS;

    const maskArray = IP_CLASS_DEFAULT_MASKS[className];

    return !maskArray
      ? undefined
      : new IPv4Mask(maskArray[0], maskArray[1], maskArray[2], maskArray[3]);
  }

  public get octets(): IPv4Octets {
    return [...this._octets];
  }

  public get bits(): IPv4BitArray {
    return [...this._bits];
  }

  protected _octets: IPv4Octets;

  protected _bits: IPv4BitArray;

  constructor(oct1: number, oct2: number, oct3: number, oct4: number) {
    const octets: IPv4Octets = [oct1, oct2, oct3, oct4];
    let bits: number[] = [];
    octets.forEach((o, i) => {
      if (o < 0 || o > 255) {
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

    this._octets = octets;
    this._bits = bits as IPv4BitArray;
  }

  public toString(): string {
    return this._octets.join(".");
  }

  public valueOf(): number {
    const bits = this.bits.join("");

    return parseInt(bits, 2);
  }

  public mask(mask: IPv4Mask): IPv4Network {
    return new IPv4Network(this, mask);
  }

  public equals(ip: IPv4Address): boolean {
    return `${this}` === `${ip}`;
  }

  protected inRange(rangeArray: number[][]) {
    const [start, end] = rangeArray;
    const [s0, s1, s2, s3] = start;
    const [e0, e1, e2, e3] = end;
    const startIp = new IPv4Address(s0, s1, s2, s3);
    const endIp = new IPv4Address(e0, e1, e2, e3);
    const range = new IPv4Range(startIp, endIp);

    return range.contains(this);
  }
}
