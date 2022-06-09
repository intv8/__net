import { IPv4Address } from "./IPv4Address.ts";
import { IPv4Mask } from "./IPv4Mask.ts";
import { IPv4Range } from "./IPv4Range.ts";

import {
  IP_CLASS_DEFAULT_MASKS,
  IP_CLASS_RANGES,
  RFC1112_RESERVED,
  RFC1122_LOOPBACK,
  RFC1122_THIS_HOST_THIS_NETWORK,
  RFC1918_PRIVATE_ADDRESSES,
  RFC1918_PRIVATE_USE_CLASS_A,
  RFC1918_PRIVATE_USE_CLASS_B,
  RFC1918_PRIVATE_USE_CLASS_C,
  RFC2544_BENCHMARKING,
  RFC3068_6_TO_4_RELAY_ANYCAST,
  RFC3927_LINK_LOCAL,
  RFC5736_IETF_PROTOCOL_ASSIGNMENTS,
  RFC5737_TEST_NET_1,
  RFC5737_TEST_NET_2,
  RFC5737_TEST_NET_3,
  RFC5771_IP_MULTICAST,
  RFC5771_MCAST_TEST_NET,
  RFC6333_DS_LITE,
  RFC6598_SHARED_ADDRESS_SPACE,
  RFC791_CLASS_A_NETWORK,
  RFC791_CLASS_B_NETWORK,
  RFC791_CLASS_C_NETWORK,
  RFC988_CLASS_D_NETWORK,
  RFC988_CLASS_E_NETWORK,
} from "./_local_constants.ts";

const makeRange = (range: number[][]): IPv4Range => {
  const [s1, e1] = range;
  const [s1_1, s1_2, s1_3, s1_4] = s1;
  const [e1_1, e1_2, e1_3, e1_4] = e1;
  const sip1 = new IPv4Address(s1_1, s1_2, s1_3, s1_4);
  const eip1 = new IPv4Address(e1_1, e1_2, e1_3, e1_4);

  return new IPv4Range(sip1, eip1);
};

/**
 * The `localhost`, or current device accessing a network.
 */
export const IPV4_LOCAL_HOST = new IPv4Address(127, 0, 0, 1);

/**
 * A special IP that indicates any IP address assigned to an interface on the
 * local machine.
 * 
 * For example, if a machine has an IP of `192.168.1.25` on interface `eth0`
 * and an IP of `10.25.1.210` on `eth1`. A service listening on IP `0.0.0.0`
 * will respond to requests on both `192.168.1.25` and `10.25.1.210`.
 */
export const IPV4_ALL_ZERO = new IPv4Address(0, 0, 0, 0);

/**
 * Requests to `255.255.255.255` perform unforwarded broadcasts on local
 * hardware.
 */
export const IPV4_LIMITED_BROADCAST = new IPv4Address(255, 255, 255, 255);

/**
 * Formally a class E network, this range has been reserved for future use.
 */
export const IPV4_RFC1112_RESERVED = makeRange(RFC1112_RESERVED);

/**
 * The loopback network, which allows network services to run without the need
 * for a physical network interface.
 */
export const IPV4_RFC1122_LOOPBACK = makeRange(RFC1122_LOOPBACK);

/**
 * The current network.
 */
export const IPV4_RFC1122_THIS_HOST_THIS_NETWORK = makeRange(
  RFC1122_THIS_HOST_THIS_NETWORK,
);

/**
 * An array of ranges containing the list of private IP addresses.
 */
export const IPV4_RFC1918_PRIVATE_ADDRESSES = RFC1918_PRIVATE_ADDRESSES.map(
  (range) => makeRange(range),
);

/**
 * The range of 
 */
export const IPV4_RFC1918_PRIVATE_USE_CLASS_A = makeRange(
  RFC1918_PRIVATE_USE_CLASS_A,
);
export const IPV4_RFC1918_PRIVATE_USE_CLASS_B = makeRange(
  RFC1918_PRIVATE_USE_CLASS_B,
);
export const IPV4_RFC1918_PRIVATE_USE_CLASS_C = makeRange(
  RFC1918_PRIVATE_USE_CLASS_C,
);
export const IPV4_RFC2544_BENCHMARKING = makeRange(RFC2544_BENCHMARKING);
export const IPV4_RFC3068_6_TO_4_RELAY_ANYCAST = makeRange(
  RFC3068_6_TO_4_RELAY_ANYCAST,
);
export const IPV4_RFC3927_LINK_LOCAL = makeRange(RFC3927_LINK_LOCAL);
export const IPV4_RFC5736_IETF_PROTOCOL_ASSIGNMENTS = makeRange(
  RFC5736_IETF_PROTOCOL_ASSIGNMENTS,
);
export const IPV4_RFC5737_TEST_NET_1 = makeRange(RFC5737_TEST_NET_1);
export const IPV4_RFC5737_TEST_NET_2 = makeRange(RFC5737_TEST_NET_2);
export const IPV4_RFC5737_TEST_NET_3 = makeRange(RFC5737_TEST_NET_3);
export const IPV4_RFC5771_IP_MULTICAST = makeRange(RFC5771_IP_MULTICAST);
export const IPV4_RFC5771_MCAST_TEST_NET = makeRange(RFC5771_MCAST_TEST_NET);
export const IPV4_RFC6333_DS_LITE = makeRange(RFC6333_DS_LITE);
export const IPV4_RFC6598_SHARED_ADDRESS_SPACE = makeRange(
  RFC6598_SHARED_ADDRESS_SPACE,
);
export const IPV4_RFC791_CLASS_A_NETWORK = makeRange(RFC791_CLASS_A_NETWORK);
export const IPV4_RFC791_CLASS_B_NETWORK = makeRange(RFC791_CLASS_B_NETWORK);
export const IPV4_RFC791_CLASS_C_NETWORK = makeRange(RFC791_CLASS_C_NETWORK);
export const IPV4_RFC988_CLASS_D_NETWORK = makeRange(RFC988_CLASS_D_NETWORK);
export const IPV4_RFC988_CLASS_E_NETWORK = makeRange(RFC988_CLASS_E_NETWORK);

export const IPV4_CLASS_RANGES = {
  A: makeRange(IP_CLASS_RANGES.A),
  B: makeRange(IP_CLASS_RANGES.B),
  C: makeRange(IP_CLASS_RANGES.C),
  D: makeRange(IP_CLASS_RANGES.D),
  E: makeRange(IP_CLASS_RANGES.E),
};

const { A, B, C, D, E } = IP_CLASS_DEFAULT_MASKS;

export const IPV4_CLASS_DEFAULT_MASKS = {
  A: new IPv4Mask(A[0], A[1], A[2], A[3]),
  B: new IPv4Mask(B[0], B[1], B[2], B[3]),
  C: new IPv4Mask(C[0], C[1], C[2], C[3]),
  D,
  E,
};
