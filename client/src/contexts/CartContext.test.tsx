import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart, CartItem } from './CartContext';

describe('CartContext', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('should add item to cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({ ...item, quantity: 1 });
    expect(result.current.getTotalItems()).toBe(1);
    expect(result.current.getTotalPrice()).toBe(50000);
  });

  it('should increase quantity when adding duplicate item', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem(item);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.getTotalItems()).toBe(2);
    expect(result.current.getTotalPrice()).toBe(100000);
  });

  it('should remove item from cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
      result.current.removeItem('1');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('should update item quantity', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity('1', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getTotalItems()).toBe(5);
    expect(result.current.getTotalPrice()).toBe(250000);
  });

  it('should remove item when quantity is set to 0', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
      result.current.updateQuantity('1', 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should clear cart', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
      result.current.addItem({ ...item, id: '2', name: 'Product 2' });
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
    expect(result.current.getTotalPrice()).toBe(0);
  });

  it('should persist cart to localStorage', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item = {
      id: '1',
      name: 'Test Product',
      price: 50000,
      image: 'test.jpg',
    };

    act(() => {
      result.current.addItem(item);
    });

    const savedCart = localStorage.getItem('burnita_cart');
    expect(savedCart).toBeDefined();
    const parsedCart = JSON.parse(savedCart!);
    expect(parsedCart).toHaveLength(1);
    expect(parsedCart[0]).toEqual({ ...item, quantity: 1 });
  });

  it('should load cart from localStorage on mount', () => {
    const cartData: CartItem[] = [
      {
        id: '1',
        name: 'Test Product',
        price: 50000,
        image: 'test.jpg',
        quantity: 2,
      },
    ];

    localStorage.setItem('burnita_cart', JSON.stringify(cartData));

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.getTotalItems()).toBe(2);
    expect(result.current.getTotalPrice()).toBe(100000);
  });

  it('should handle multiple items with correct totals', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CartProvider>{children}</CartProvider>
    );
    const { result } = renderHook(() => useCart(), { wrapper });

    const item1 = {
      id: '1',
      name: 'Product 1',
      price: 50000,
      image: 'test1.jpg',
    };

    const item2 = {
      id: '2',
      name: 'Product 2',
      price: 55000,
      image: 'test2.jpg',
    };

    act(() => {
      result.current.addItem(item1);
      result.current.addItem(item2);
      result.current.addItem(item1);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.getTotalItems()).toBe(3);
    expect(result.current.getTotalPrice()).toBe(155000); // (50000 * 2) + 55000
  });

  it('should throw error when useCart is used outside CartProvider', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useCart());
    }).toThrow('useCart must be used within CartProvider');

    consoleError.mockRestore();
  });
});
