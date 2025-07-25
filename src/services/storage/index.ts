import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/constants';

/**
 * 本地存储服务
 * 封装 AsyncStorage 操作，提供类型安全的存储接口
 */
class StorageService {
  /**
   * 存储数据
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error storing data for key ${key}:`, error);
      throw error;
    }
  }

  /**
   * 获取数据
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error retrieving data for key ${key}:`, error);
      return null;
    }
  }

  /**
   * 删除数据
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data for key ${key}:`, error);
      throw error;
    }
  }

  /**
   * 清除所有数据
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * 获取所有键
   */
  async getAllKeys(): Promise<readonly string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  /**
   * 批量操作
   */
  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error in multiSet:', error);
      throw error;
    }
  }

  async multiGet(keys: string[]): Promise<readonly [string, string | null][]> {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Error in multiGet:', error);
      return [];
    }
  }

  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error in multiRemove:', error);
      throw error;
    }
  }

  // 认证相关存储方法
  async setAuthToken(token: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  }

  async getAuthToken(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  async setRefreshToken(refreshToken: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  async getRefreshToken(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async setUserType(userType: 'user' | 'worker'): Promise<void> {
    return this.setItem(STORAGE_KEYS.USER_TYPE, userType);
  }

  async getUserType(): Promise<'user' | 'worker' | null> {
    return this.getItem<'user' | 'worker'>(STORAGE_KEYS.USER_TYPE);
  }

  async setUserId(userId: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.USER_ID, userId);
  }

  async getUserId(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.USER_ID);
  }

  async clearAuthData(): Promise<void> {
    const authKeys = [
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.USER_TYPE,
      STORAGE_KEYS.USER_ID,
    ];
    return this.multiRemove(authKeys);
  }

  // 用户偏好设置
  async setTheme(theme: 'light' | 'dark' | 'system'): Promise<void> {
    return this.setItem(STORAGE_KEYS.THEME, theme);
  }

  async getTheme(): Promise<'light' | 'dark' | 'system' | null> {
    return this.getItem<'light' | 'dark' | 'system'>(STORAGE_KEYS.THEME);
  }

  async setLanguage(language: string): Promise<void> {
    return this.setItem(STORAGE_KEYS.LANGUAGE, language);
  }

  async getLanguage(): Promise<string | null> {
    return this.getItem<string>(STORAGE_KEYS.LANGUAGE);
  }

  async setNotificationsEnabled(enabled: boolean): Promise<void> {
    return this.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, enabled);
  }

  async getNotificationsEnabled(): Promise<boolean> {
    const enabled = await this.getItem<boolean>(STORAGE_KEYS.NOTIFICATIONS_ENABLED);
    return enabled !== null ? enabled : true; // 默认启用通知
  }

  // 应用状态
  async setFirstLaunch(isFirst: boolean): Promise<void> {
    return this.setItem(STORAGE_KEYS.FIRST_LAUNCH, isFirst);
  }

  async isFirstLaunch(): Promise<boolean> {
    const isFirst = await this.getItem<boolean>(STORAGE_KEYS.FIRST_LAUNCH);
    return isFirst !== null ? isFirst : true; // 默认是首次启动
  }

  async setOnboardingCompleted(completed: boolean): Promise<void> {
    return this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  }

  async isOnboardingCompleted(): Promise<boolean> {
    const completed = await this.getItem<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETED);
    return completed !== null ? completed : false; // 默认未完成引导
  }

  // 缓存数据
  async setUserProfile(profile: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.USER_PROFILE, profile);
  }

  async getUserProfile(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.USER_PROFILE);
  }

  async setWorkerProfile(profile: any): Promise<void> {
    return this.setItem(STORAGE_KEYS.WORKER_PROFILE, profile);
  }

  async getWorkerProfile(): Promise<any | null> {
    return this.getItem(STORAGE_KEYS.WORKER_PROFILE);
  }

  async setRecentSearches(searches: string[]): Promise<void> {
    return this.setItem(STORAGE_KEYS.RECENT_SEARCHES, searches);
  }

  async getRecentSearches(): Promise<string[]> {
    const searches = await this.getItem<string[]>(STORAGE_KEYS.RECENT_SEARCHES);
    return searches || [];
  }

  async addRecentSearch(search: string): Promise<void> {
    const searches = await this.getRecentSearches();
    const filteredSearches = searches.filter(s => s !== search);
    const newSearches = [search, ...filteredSearches].slice(0, 10); // 保留最近10个搜索
    return this.setRecentSearches(newSearches);
  }

  async clearRecentSearches(): Promise<void> {
    return this.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
  }

  // 权限状态
  async setLocationPermission(granted: boolean): Promise<void> {
    return this.setItem(STORAGE_KEYS.LOCATION_PERMISSION, granted);
  }

  async getLocationPermission(): Promise<boolean | null> {
    return this.getItem<boolean>(STORAGE_KEYS.LOCATION_PERMISSION);
  }
}

// 创建单例实例
export const storageService = new StorageService();
export default storageService;