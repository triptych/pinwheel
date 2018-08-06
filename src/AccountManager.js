'use strict';

const Data = require('./Data');
const Account = require('./Account');

/**
 * Creates/loads {@linkplain Account|Accounts}
 * @property {Map<string,Account>} accounts
 */
class AccountManager extends Map {
  /**
   * @param {Account} acc
   */
  addAccount(acc) {
    this.set(acc.username, acc);
  }

  /**
   * @param {string} username
   * @return {Account|undefined}
   */
  getAccount(username) {
    return this.get(username);
  }

  /**
   * @param {string} username
   * @param {boolean} force Force reload data from disk
   */
  loadAccount(username, force) {
    if (this.has(username) && !force) {
      return this.getAccount(username);
    }

    if (!Data.exists('account', username)) {
      throw new Error(`Account [${username}] doesn't exist`);
    }

    const data = Data.load('account', username);

    let account = new Account(data);
    this.addAccount(account);

    return account;
  }
}

module.exports = AccountManager;
