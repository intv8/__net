import { ArgumentException, ParseException } from "../deps.ts";
import { assert, assertEquals, assertThrows } from "../dev_deps.ts";
import { IPv4Address, IPv4Mask } from "../mod.ts";
import type { IPv4BitArray } from "../mod.ts";

const ip10_1_1_1_bits: IPv4BitArray = [
  0,
  0,
  0,
  0,
  1,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
];
const ip10_1_1_1_value = 167837953;

Deno.test("IPv4Address(octets)", () => {
  assertThrows(() => new IPv4Address(10, 1, 1, 256), ArgumentException);

  const ip = new IPv4Address(10, 1, 1, 1);

  assertEquals(ip.bits, ip10_1_1_1_bits);
  assertEquals(ip.className, "A");
  assertEquals(`${ip.defaultMask}`, "255.0.0.0");
  assertEquals(ip.isAPIPA, false);
  assertEquals(ip.isLoopBack, false);
  assertEquals(ip.isPrivate, true);
  assertEquals(ip.toString(), "10.1.1.1");
  assertEquals(ip.octets, [10, 1, 1, 1]);
  assertEquals(+ip, ip10_1_1_1_value);
});

Deno.test("IPv4Address.parseIPv4(ipAddrString)", () => {
  assertThrows(() => IPv4Address.parseIPv4("10.1.1"), ParseException);
  assertThrows(() => IPv4Address.parseIPv4("10.1.1.256"), ArgumentException);

  const ip = IPv4Address.parseIPv4("10.1.1.1");

  assertEquals(ip.bits, ip10_1_1_1_bits);
  assertEquals(ip.className, "A");
  assertEquals(`${ip.defaultMask}`, "255.0.0.0");
  assertEquals(ip.isAPIPA, false);
  assertEquals(ip.isLoopBack, false);
  assertEquals(ip.isPrivate, true);
  assertEquals(ip.toString(), "10.1.1.1");
  assertEquals(ip.octets, [10, 1, 1, 1]);
  assertEquals(+ip, ip10_1_1_1_value);
});

Deno.test("IPv4Address.fromValue(bitsValue)", async () => {
  const ip = await IPv4Address.fromValue(ip10_1_1_1_value);

  assertEquals(ip.bits, ip10_1_1_1_bits);
  assertEquals(ip.className, "A");
  assertEquals(`${ip.defaultMask}`, "255.0.0.0");
  assertEquals(ip.isAPIPA, false);
  assertEquals(ip.isLoopBack, false);
  assertEquals(ip.isPrivate, true);
  assertEquals(ip.toString(), "10.1.1.1");
  assertEquals(ip.octets, [10, 1, 1, 1]);
  assertEquals(+ip, ip10_1_1_1_value);
});

Deno.test("IPv4Address.fromBits(bitArray)", () => {
  assertThrows(
    () =>
      IPv4Address.fromBits(
        ip10_1_1_1_bits.map((b) => b ? 2 : b) as IPv4BitArray,
      ),
    ArgumentException,
  );

  const ip = IPv4Address.fromBits(ip10_1_1_1_bits);

  assertEquals(ip.bits, ip10_1_1_1_bits);
  assertEquals(ip.className, "A");
  assertEquals(`${ip.defaultMask}`, "255.0.0.0");
  assertEquals(ip.isAPIPA, false);
  assertEquals(ip.isLoopBack, false);
  assertEquals(ip.isPrivate, true);
  assertEquals(ip.toString(), "10.1.1.1");
  assertEquals(ip.octets, [10, 1, 1, 1]);
  assertEquals(+ip, ip10_1_1_1_value);
});

Deno.test("IPv4Address::equals(ip)", () => {
  const ip1 = IPv4Address.parseIPv4("10.1.1.1");
  const ip2 = IPv4Address.fromBits(ip10_1_1_1_bits);

  assert(ip1.equals(ip2));
});

Deno.test("IPv4Address::mask(mask)", () => {
  const ip = IPv4Address.parseIPv4("10.1.1.22");
  const mask = ip.mask(IPv4Mask.fromPrefix(24));

  assert(mask.network.equals(IPv4Address.parseIPv4("10.1.1.0")));
});

Deno.test("IPv4Address::isAPIPA", () => {
  const nope = IPv4Address.parseIPv4("10.1.1.22");
  const yep = IPv4Address.parseIPv4("169.254.0.1");

  assert(!nope.isAPIPA);
  assert(yep.isAPIPA);
});

Deno.test("IPv4Address::isLoopBack", () => {
  const nope = IPv4Address.parseIPv4("10.1.1.22");
  const yep = IPv4Address.parseIPv4("127.0.0.1");

  assert(!nope.isLoopBack);
  assert(yep.isLoopBack);
});

Deno.test("IPv4Address::isPrivate", () => {
  const nope = IPv4Address.parseIPv4("216.45.85.45");
  const yep = IPv4Address.parseIPv4("10.1.1.2");

  assert(!nope.isPrivate);
  assert(yep.isPrivate);
});
