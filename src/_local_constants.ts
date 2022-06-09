/**
 * Contains constants associated with IPv4 RFCs.
 *
 * @copyright 2021-2022 IntegerEleven. All rights reserved. MIT license.
 */

/**
 * A range indicating this host on this network.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc1122#page-29
 */
export const RFC1122_THIS_HOST_THIS_NETWORK = [[0, 0, 0, 0], [
  0,
  255,
  255,
  255,
]];

/**
 * Local communications within a private network in the class A address range.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc1918#section-3
 */
export const RFC1918_PRIVATE_USE_CLASS_A = [[10, 0, 0, 0], [10, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6598#section-7
 */
export const RFC6598_SHARED_ADDRESS_SPACE = [[100, 64, 0, 0], [
  100,
  127,
  255,
  255,
]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc1122#section-3.2.1.3
 */
export const RFC1122_LOOPBACK = [[127, 0, 0, 0], [127, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc3927
 */
export const RFC3927_LINK_LOCAL = [[169, 254, 0, 0], [169, 254, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc1918#section-3
 */
export const RFC1918_PRIVATE_USE_CLASS_B = [[172, 16, 0, 0], [
  172,
  31,
  255,
  255,
]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6890#section-2.1
 */
export const RFC5736_IETF_PROTOCOL_ASSIGNMENTS = [[192, 0, 0, 0], [
  192,
  0,
  0,
  255,
]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc6333
 */
export const RFC6333_DS_LITE = [[192, 0, 0, 0], [192, 0, 0, 7]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5737
 */
export const RFC5737_TEST_NET_1 = [[192, 0, 2, 0], [192, 0, 2, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc3068
 */
export const RFC3068_6_TO_4_RELAY_ANYCAST = [[192, 88, 99, 0], [
  192,
  88,
  99,
  255,
]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc1918#section-3
 */
export const RFC1918_PRIVATE_USE_CLASS_C = [[192, 168, 0, 0], [
  192,
  168,
  255,
  255,
]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc2544
 */
export const RFC2544_BENCHMARKING = [[198, 18, 0, 0], [198, 19, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5737
 */
export const RFC5737_TEST_NET_2 = [[198, 51, 100, 0], [198, 51, 100, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5737
 */
export const RFC5737_TEST_NET_3 = [[203, 0, 113, 0], [203, 0, 113, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5771
 */
export const RFC5771_IP_MULTICAST = [[224, 0, 0, 0], [239, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5771
 */
export const RFC5771_MCAST_TEST_NET = [[233, 252, 0, 0], [233, 252, 0, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc1112#section-4
 */
export const RFC1112_RESERVED = [[240, 0, 0, 0], [255, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc791
 */
export const RFC791_CLASS_A_NETWORK = [[1, 0, 0, 0], [127, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc791
 */
export const RFC791_CLASS_B_NETWORK = [[128, 0, 0, 0], [191, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc791
 */
export const RFC791_CLASS_C_NETWORK = [[192, 0, 0, 0], [223, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc988
 */
export const RFC988_CLASS_D_NETWORK = [[224, 0, 0, 0], [239, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc988
 */
export const RFC988_CLASS_E_NETWORK = [[240, 0, 0, 0], [255, 255, 255, 255]];

/**
 * @see https://datatracker.ietf.org/doc/html/rfc791
 * @see https://datatracker.ietf.org/doc/html/rfc5735
 */
export const IP_CLASS_RANGES = {
  A: RFC791_CLASS_A_NETWORK,
  B: RFC791_CLASS_B_NETWORK,
  C: RFC791_CLASS_C_NETWORK,
  D: RFC988_CLASS_D_NETWORK,
  E: RFC988_CLASS_E_NETWORK,
};

/**
 * @see https://datatracker.ietf.org/doc/html/rfc791
 * @see https://datatracker.ietf.org/doc/html/rfc5735
 */
export const IP_CLASS_DEFAULT_MASKS = {
  A: [255, 0, 0, 0],
  B: [255, 255, 0, 0],
  C: [255, 255, 255, 0],
  D: undefined,
  E: undefined,
};

/**
 * @see https://datatracker.ietf.org/doc/html/rfc1918
 */
export const RFC1918_PRIVATE_ADDRESSES = [
  RFC1918_PRIVATE_USE_CLASS_A,
  RFC1918_PRIVATE_USE_CLASS_B,
  RFC1918_PRIVATE_USE_CLASS_C,
];
