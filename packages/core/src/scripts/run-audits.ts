import cron from 'node-cron';
import { AuditService } from '../services/audit.service';
import { defaultAuditConfig } from '../config/audit.config';
import { logger } from '../utils/logger';

async function runAudits() {
  try {
    const auditService = new AuditService(defaultAuditConfig);
    const { success, results } = await auditService.runAllAudits();

    if (!success) {
      logger.error('Las auditorías han fallado:', results);
      process.exit(1);
    }

    logger.info('Todas las auditorías completadas exitosamente:', results);
  } catch (error) {
    logger.error('Error ejecutando auditorías:', error);
    process.exit(1);
  }
}

// Programar las auditorías según la configuración
cron.schedule(defaultAuditConfig.schedule, runAudits);

// Ejecutar inmediatamente si se llama directamente
if (require.main === module) {
  runAudits();
}
