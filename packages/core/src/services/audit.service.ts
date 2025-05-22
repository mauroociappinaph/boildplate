import { exec } from 'child_process';
import { promisify } from 'util';
import { AuditConfig } from '../config/audit.config';
import { logger } from '../utils/logger';

const execAsync = promisify(exec);

interface AuditResults {
  dependencies: boolean;
  quality: boolean;
  performance: boolean;
  dependencyAnalysis: boolean;
}

export class AuditService {
  private config: AuditConfig;

  constructor(config: AuditConfig) {
    this.config = config;
  }

  async runDependencyAudit(): Promise<boolean> {
    try {
      logger.info('Iniciando auditoría de dependencias...');
      const { stdout } = await execAsync('npm run audit:deps');
      logger.info('Resultado de auditoría de dependencias:', stdout);
      return true;
    } catch (error) {
      logger.error('Error en auditoría de dependencias:', error);
      return false;
    }
  }

  async runSonarAudit(): Promise<boolean> {
    try {
      logger.info('Iniciando auditoría de calidad de código...');
      const { stdout } = await execAsync('npm run audit:sonar');
      logger.info('Resultado de auditoría de calidad:', stdout);
      return true;
    } catch (error) {
      logger.error('Error en auditoría de calidad:', error);
      return false;
    }
  }

  async runLighthouseAudit(): Promise<boolean> {
    try {
      logger.info('Iniciando auditoría de rendimiento...');
      const { stdout } = await execAsync('npm run audit:lighthouse');
      logger.info('Resultado de auditoría de rendimiento:', stdout);
      return true;
    } catch (error) {
      logger.error('Error en auditoría de rendimiento:', error);
      return false;
    }
  }

  async runDependencyCruise(): Promise<boolean> {
    try {
      logger.info('Iniciando análisis de dependencias...');
      const { stdout } = await execAsync('npm run audit:deps-cruise');
      logger.info('Resultado de análisis de dependencias:', stdout);
      return true;
    } catch (error) {
      logger.error('Error en análisis de dependencias:', error);
      return false;
    }
  }

  async runAllAudits(): Promise<{
    success: boolean;
    results: AuditResults;
  }> {
    const results: AuditResults = {
      dependencies: await this.runDependencyAudit(),
      quality: await this.runSonarAudit(),
      performance: await this.runLighthouseAudit(),
      dependencyAnalysis: await this.runDependencyCruise(),
    };

    const success = Object.values(results).every((result) => result);

    if (!success) {
      await this.sendNotifications(results);
    }

    return { success, results };
  }

  private async sendNotifications(results: AuditResults): Promise<void> {
    const { email, slack } = this.config.notifications;

    if (email?.length) {
      // Implementar envío de email
      logger.info('Enviando notificaciones por email...', results);
    }

    if (slack) {
      // Implementar envío a Slack
      logger.info('Enviando notificaciones a Slack...', results);
    }
  }
}
