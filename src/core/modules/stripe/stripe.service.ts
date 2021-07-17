import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Job } from '../../utils/job';

@Injectable()
export class StripeService {
  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  public async checkBalance() {
    try {
      return await this.stripeClient.balance.retrieve();
    } catch (error) {
      throw error;
    }
  }

  /**
   * signing webhook signature
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async signWebhookSignature(job: Job) {
    try {
      const data = await this.stripeClient.webhooks.constructEvent(
        job.payload.body,
        job.payload.stripeSignature,
        job.payload.endPointSignature,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Create card token
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async createCardToken(job: Job) {
    try {
      const data = await this.stripeClient.tokens.create(job.payload);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Create account token
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async createAccountToken(job: Job) {
    try {
      const data = await this.stripeClient.tokens.create(job.payload);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Create bank account token
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async createBankAccountToken(job: Job) {
    try {
      const data = await this.stripeClient.tokens.create(job.payload);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * Create customer
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async createCustomer(job: Job) {
    try {
      const data = await this.stripeClient.customers.create(job.payload);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * list cards
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async getCards(job: Job) {
    try {
      const data = await this.stripeClient.customers.listSources(
        job.payload.stripe_customer_id,
        { object: 'card' },
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * charge payments
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async chargePayment(job: Job) {
    try {
      const data = await this.stripeClient.charges.create(job.payload);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * update charge payments
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async updateCharge(job: Job) {
    try {
      return this.stripeClient.charges.update(job.payload.charge_id, {
        metadata: job.payload.metadata,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * retrieve charge payments
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async retrieveCharge(job: Job) {
    try {
      const data = await this.stripeClient.charges.retrieve(
        job.payload.charge_id,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * make card default
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async makeDefaultCard(job: Job) {
    try {
      const data = await this.stripeClient.customers.update(
        job.payload.stripe_customer_id,
        {
          default_source: job.payload.card_id,
        },
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * add card
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async addCard(job: Job) {
    try {
      const data = await this.stripeClient.customers.createSource(
        job.payload.stripe_customer_id,
        {
          source: job.payload.card_token,
        },
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * retrieve card
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async getCardDetails(job: Job) {
    try {
      const data = await this.stripeClient.customers.retrieveSource(
        job.payload.stripe_customer_id,
        job.payload.card_id,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * update card
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async updateCard(job: Job) {
    try {
      return this.stripeClient.customers.updateSource(
        job.payload.stripe_customer_id,
        job.payload.card_id,
        {
          name: job.payload.name,
          exp_month: job.payload.exp_month,
          exp_year: job.payload.exp_year,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * delete card
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async deleteCard(job: Job) {
    try {
      const data = await this.stripeClient.customers.deleteSource(
        job.payload.stripe_customer_id,
        job.payload.card_id,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * create account
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async createAccount(job: Job) {
    try {
      const data = await this.stripeClient.accounts.create(job.payload);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * retrieve account
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async getAccount(job: Job) {
    try {
      const data = await this.stripeClient.accounts.retrieve(
        job.payload.account_id,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * update account
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async updateAccount(job: Job) {
    try {
      const data = await this.stripeClient.accounts.update(
        job.payload.account_id,
        { account_token: job.payload.account_token },
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * delete account
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async deleteAccount(job: Job) {
    try {
      const data = await this.stripeClient.accounts.del(job.payload.account_id);
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * add bank
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async addBank(job: Job) {
    try {
      const data = await this.stripeClient.accounts.createExternalAccount(
        job.payload.account_id,
        { external_account: job.payload.bank_token },
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * get banks
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async getBanks(job: Job) {
    try {
      const data = await this.stripeClient.accounts.listExternalAccounts(
        job.payload.account_id,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * update bank
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async updateBank(job: Job) {
    try {
      const data = await this.stripeClient.accounts.updateExternalAccount(
        job.payload.account_id,
        job.payload.bank_id,
        {
          account_holder_name: job.payload.account_holder_name,
        },
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * delete bank
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async deleteBank(job: Job) {
    try {
      const data = await this.stripeClient.accounts.deleteExternalAccount(
        job.payload.account_id,
        job.payload.bank_id,
      );
      return { data };
    } catch (error) {
      return { error };
    }
  }

  /**
   * transfer fund to customer account
   * @function
   * @param {object} job - mandatory - a job object representing the job information
   * @return {object} { error, data }
   */
  public async transfer(job: Job) {
    try {
      return await this.stripeClient.transfers.create({
        amount: job.payload.amount,
        currency: job.payload.currency,
        destination: job.payload.destination,
        metadata: job.payload.metadata,
        description: job.payload.description,
        source_transaction: job.payload.source_transaction,
      });
    } catch (error) {
      throw error;
    }
  }
}
