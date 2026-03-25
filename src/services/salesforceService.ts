import { Servicio } from '@/types';

/**
 * Mock service to simulate Salesforce integration
 */
export const salesforceService = {
  /**
   * Syncs a service report to Salesforce
   * @param servicio The service data to sync
   * @returns Promise with sync status and Salesforce ID
   */
  syncService: async (servicio: Servicio): Promise<{ success: boolean; salesforceId?: string }> => {
    console.log('Sincronizando con Salesforce...', servicio);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Simulate success
    const mockSalesforceId = `SF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    
    return {
      success: true,
      salesforceId: mockSalesforceId
    };
  },

  /**
   * Fetches client data from Salesforce
   * @param contratoId The Salesforce contract ID
   */
  fetchClientByContract: async (contratoId: string) => {
    console.log('Buscando cliente en Salesforce:', contratoId);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      id: 'mock-id',
      nombre: 'Cliente desde Salesforce',
      direccion: 'Av. Paseo de la Reforma 1, CDMX',
      colonia: 'Juárez',
      zona: 'Centro',
      telefono: '5512345678',
      id_contrato_salesforce: contratoId
    };
  }
};
