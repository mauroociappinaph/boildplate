import { z } from 'zod';

export const AuditConfigSchema = z.object({
  schedule: z.string().default('0 0 1 * *'), // Mensual por defecto
  tools: z.object({
    dependencies: z.boolean().default(true),
    performance: z.boolean().default(true),
    security: z.boolean().default(true),
    codeQuality: z.boolean().default(true),
  }),
  thresholds: z.object({
    dependencies: z.object({
      maxVulnerabilities: z.number().default(0),
      maxOutdated: z.number().default(5),
    }),
    performance: z.object({
      minLighthouseScore: z.number().min(0).max(100).default(90),
    }),
    codeQuality: z.object({
      minCoverage: z.number().min(0).max(100).default(80),
      maxComplexity: z.number().default(10),
    }),
  }),
  notifications: z.object({
    email: z.array(z.string().email()).optional(),
    slack: z.string().url().optional(),
  }),
});

export type AuditConfig = z.infer<typeof AuditConfigSchema>;

export const defaultAuditConfig: AuditConfig = {
  schedule: '0 0 1 * *', // Mensual
  tools: {
    dependencies: true,
    performance: true,
    security: true,
    codeQuality: true,
  },
  thresholds: {
    dependencies: {
      maxVulnerabilities: 0,
      maxOutdated: 5,
    },
    performance: {
      minLighthouseScore: 90,
    },
    codeQuality: {
      minCoverage: 80,
      maxComplexity: 10,
    },
  },
  notifications: {
    email: [],
    slack: undefined,
  },
};
