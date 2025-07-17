import { z } from 'zod';

export const spacexLaunchSchema = z.object({
	id: z.string(),
	name: z.string(),

	date_utc: z.iso.datetime(),
	date_unix: z.number(),
	date_local: z.string(),
	date_precision: z.union([
		z.literal("half"),
		z.literal("quarter"),
		z.literal("year"),
		z.literal("month"),
		z.literal("day"),
		z.literal("hour"),
	]),

	static_fire_date_utc: z.string().nullable(),
	static_fire_date_unix: z.number().nullable(),

	tdb: z.boolean().optional(),
	net: z.boolean().optional(),
	window: z.number().nullable(),
	rocket: z.string().nullable(),
	success: z.boolean().nullable(),
	failures: z.array(
		z.object({
			time: z.number(),
			altitude: z.number().nullable(),
			reason: z.string(),
		})
	),
	upcoming: z.boolean(),
	details: z.string().nullable(),
	fairings: z
		.object({
			reused: z.boolean().nullable(),
			recovery_attempt: z.boolean().nullable(),
			recovered: z.boolean().nullable(),
			ships: z.array(z.string()),
		})
		.nullable(),
	crew: z.array(
		z.object({
			crew: z.string().nullable(),
			role: z.string().nullable(),
		})
	),
	ships: z.array(z.string()),
	capsules: z.array(z.string()),
	payloads: z.array(z.string()),
	launchpad: z.string().nullable(),
	auto_update: z.boolean(),
	flight_number: z.number(),

	cores: z.array(
		z.object({
			core: z.string().nullable(),
			flight: z.number().nullable(),
			gridfins: z.boolean().nullable(),
			legs: z.boolean().nullable(),
			reused: z.boolean().nullable(),
			landing_attempt: z.boolean().nullable(),
			landing_success: z.boolean().nullable(),
			landing_type: z.string().nullable(),
			landpad: z.string().nullable(),
		})
	),

	links: z.object({
		patch: z.object({
			small: z.string().nullable(),
			large: z.string().nullable(),
		}),

		reddit: z.object({
			campaign: z.string().nullable(),
			launch: z.string().nullable(),
			media: z.string().nullable(),
			recovery: z.string().nullable(),
		}),

		flickr: z.object({
			small: z.array(z.string()),
			original: z.array(z.string()),
		}),

		presskit: z.string().nullable(),
		webcast: z.string().nullable(),
		youtube_id: z.string().nullable(),
		article: z.string().nullable(),
		wikipedia: z.string().nullable(),
	}),
});

export const singleLaunchResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: spacexLaunchSchema,
});

export const launchesResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
  data: z.array(spacexLaunchSchema),
});

export type SpacexLaunch = z.infer<typeof spacexLaunchSchema>;
export type SingleLaunchResponse = z.infer<typeof singleLaunchResponseSchema>;
export type LaunchesResponse = z.infer<typeof launchesResponseSchema>;
