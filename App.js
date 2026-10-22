
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  useWindowDimensions,
} from 'react-native';

const GREEN = '#00AA5B';
const DARK = '#333333';
const GRAY = '#777777';
const WHITE = '#FFFFFF';
const BG = '#F6F8F7';

const SERVICES = [
  { id: '1', name: 'Go-Ride', emoji: '🏍️', color: '#DDF7E7' },
  { id: '2', name: 'Go-Food', emoji: '🍔', color: '#FFE9DE' },
  { id: '3', name: 'Go-Send', emoji: '📦', color: '#E2EBFF' },
  { id: '4', name: 'Go-Play', emoji: '🎮', color: '#F0E3FF' },
];

const PROMOS = [
  {
    id: '1',
    emoji: '🎉',
    title: 'Diskon hingga 50%',
    subtitle: 'Promo spesial untukmu!',
    color: '#087F5B',
  },
  {
    id: '2',
    emoji: '🛵',
    title: 'Gratis ongkir',
    subtitle: 'Pesan makanan favoritmu.',
    color: '#D95336',
  },
  {
    id: '3',
    emoji: '💰',
    title: 'Cashback seru',
    subtitle: 'Lebih hemat setiap hari.',
    color: '#6250A5',
  },
];

const MERCHANTS = [
  {
    id: '1',
    name: 'Starbucks',
    emoji: '☕',
    rating: '4.8',
    distance: '0.8 km',
    category: 'Coffee & Drinks',
    color: '#F5E6D4',
  },
  {
    id: '2',
    name: 'Ayam Juara',
    emoji: '🍗',
    rating: '4.9',
    distance: '1.2 km',
    category: 'Ayam & Nasi',
    color: '#FFE6C6',
  },
  {
    id: '3',
    name: 'Boba Ceria',
    emoji: '🧋',
    rating: '4.7',
    distance: '1.5 km',
    category: 'Minuman',
    color: '#F1E0F5',
  },
  {
    id: '4',
    name: 'Roti Pagi',
    emoji: '🥐',
    rating: '4.8',
    distance: '2.0 km',
    category: 'Bakery',
    color: '#F9EDCF',
  },
];

const NAV_ITEMS = [
  { id: 'Home', emoji: '🏠', label: 'Home' },
  { id: 'Activity', emoji: '📋', label: 'Activity' },
  { id: 'Inbox', emoji: '💬', label: 'Inbox' },
  { id: 'Account', emoji: '👤', label: 'Account' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [selectedService, setSelectedService] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  function toggleFavorite(id) {
    setFavorites((old) =>
      old.includes(id)
        ? old.filter((item) => item !== id)
        : [...old, id]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={GREEN} />

      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentContainer,
          isTablet && styles.tabletContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <WalletCard />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Layanan Populer</Text>
          <View style={styles.serviceGrid}>
            {SERVICES.map((service) => (
              <Pressable
                key={service.id}
                onPress={() => setSelectedService(service.id)}
                style={[
                  styles.serviceCard,
                  selectedService === service.id &&
                    styles.serviceCardSelected,
                ]}
              >
                <View
                  style={[
                    styles.serviceIcon,
                    { backgroundColor: service.color },
                  ]}
                >
                  <Text style={styles.serviceEmoji}>
                    {service.emoji}
                  </Text>
                </View>
                <Text style={styles.serviceName}>{service.name}</Text>
                {selectedService === service.id && (
                  <Text style={styles.selectedText}>Dipilih ✓</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Promo Buat Kamu" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {PROMOS.map((promo) => (
              <View
                key={promo.id}
                style={[
                  styles.promoCard,
                  { backgroundColor: promo.color },
                ]}
              >
                <View style={styles.promoText}>
                  <Text style={styles.promoTitle}>{promo.title}</Text>
                  <Text style={styles.promoSubtitle}>
                    {promo.subtitle}
                  </Text>
                  <Text style={styles.promoAction}>
                    Klaim sekarang →
                  </Text>
                </View>
                <Text style={styles.promoEmoji}>{promo.emoji}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Merchant Terdekat" />
          <Text style={styles.sectionSubtitle}>
            Pilihan favorit di Medan
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {MERCHANTS.map((merchant) => (
              <View key={merchant.id} style={styles.merchantCard}>
                <View
                  style={[
                    styles.merchantImage,
                    { backgroundColor: merchant.color },
                  ]}
                >
                  <Text style={styles.merchantEmoji}>
                    {merchant.emoji}
                  </Text>
                </View>

                <View style={styles.merchantInfo}>
                  <Text
                    style={styles.merchantName}
                    numberOfLines={1}
                  >
                    {merchant.name}
                  </Text>
                  <Text
                    style={styles.merchantCategory}
                    numberOfLines={1}
                  >
                    {merchant.category}
                  </Text>
                  <View style={styles.merchantMeta}>
                    <Text style={styles.rating}>
                      ⭐ {merchant.rating}
                    </Text>
                    <Text style={styles.distance}>
                      {merchant.distance}
                    </Text>
                  </View>

                  <Pressable
                    onPress={() => toggleFavorite(merchant.id)}
                    style={styles.favoriteButton}
                  >
                    <Text style={styles.favoriteText}>
                      {favorites.includes(merchant.id)
                        ? '❤️ Favorit'
                        : '♡ Favorit'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomNavigation
        activeTab={activeTab}
        onChange={setActiveTab}
      />
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.headerMain}>
        <Text style={styles.brand}>gojek</Text>
        <Text style={styles.greeting}>Selamat Pagi, Cellyn! 👋</Text>
        <Text style={styles.location}>📍 Medan  ▾</Text>
      </View>
      <Pressable style={styles.avatar}>
        <Text style={styles.avatarEmoji}>👤</Text>
      </Pressable>
    </View>
  );
}

function WalletCard() {
  return (
    <View style={styles.walletCard}>
      <View>
        <Text style={styles.walletLabel}>GO-PAY SALDO</Text>
        <Text style={styles.walletAmount}>Rp 1.000.000.000</Text>
        <Text style={styles.walletSubtitle}>Saldo kamu hari ini</Text>
      </View>
      <View style={styles.walletIcon}>
        <Text style={styles.walletEmoji}>💳</Text>
      </View>
    </View>
  );
}

function SectionHeader({ title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.seeAll}>Lihat semua</Text>
    </View>
  );
}

function BottomNavigation({ activeTab, onChange }) {
  return (
    <View style={styles.bottomNav}>
      {NAV_ITEMS.map((item) => {
        const active = activeTab === item.id;

        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={styles.navItem}
          >
            <View
              style={[
                styles.navIconBox,
                active && styles.navIconBoxActive,
              ]}
            >
              <Text
                style={[
                  styles.navEmoji,
                  active && styles.navEmojiActive,
                ]}
              >
                {item.emoji}
              </Text>
            </View>
            <Text
              style={[
                styles.navLabel,
                active && styles.navLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerMain: {
    flex: 1,
    marginRight: 12,
  },
  brand: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  greeting: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  location: {
    color: '#E3FFEE',
    fontSize: 14,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 26,
  },

  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  tabletContent: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 900,
  },

  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EEEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  walletLabel: {
    color: GRAY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  walletAmount: {
    color: DARK,
    fontSize: 23,
    fontWeight: '800',
    marginTop: 6,
  },
  walletSubtitle: {
    color: GRAY,
    fontSize: 12,
    marginTop: 4,
  },
  walletIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#DDF7E7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletEmoji: {
    fontSize: 25,
  },

  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: GRAY,
    marginHorizontal: 16,
    marginTop: -6,
    marginBottom: 12,
  },
  seeAll: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '700',
  },

  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  serviceCard: {
    width: '48%',
    minHeight: 118,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E9EEEB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  serviceIcon: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  serviceEmoji: {
    fontSize: 29,
  },
  serviceName: {
    color: DARK,
    fontSize: 14,
    fontWeight: '700',
  },
  serviceCardSelected: {
    borderColor: GREEN,
    borderWidth: 2,
  },
  selectedText: {
    color: GREEN,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },

  horizontalList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  promoCard: {
    width: 280,
    minHeight: 145,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    color: WHITE,
    fontSize: 19,
    fontWeight: '800',
  },
  promoSubtitle: {
    color: WHITE,
    fontSize: 12,
    marginTop: 8,
    lineHeight: 17,
  },
  promoAction: {
    color: WHITE,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 12,
  },
  promoEmoji: {
    fontSize: 38,
  },

  merchantCard: {
    width: 175,
    backgroundColor: WHITE,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E9EEEB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  merchantImage: {
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantEmoji: {
    fontSize: 44,
  },
  merchantInfo: {
    padding: 12,
  },
  merchantName: {
    color: DARK,
    fontSize: 14,
    fontWeight: '800',
  },
  merchantCategory: {
    color: GRAY,
    fontSize: 11,
    marginTop: 4,
  },
  merchantMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  rating: {
    color: '#9A6800',
    fontSize: 11,
    fontWeight: '700',
  },
  distance: {
    color: GRAY,
    fontSize: 11,
  },
  favoriteButton: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderRadius: 8,
    backgroundColor: '#F1FBF5',
  },
  favoriteText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: '700',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderTopWidth: 1,
    borderTopColor: '#E8EEEA',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconBox: {
    minWidth: 40,
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  navIconBoxActive: {
    backgroundColor: '#DDF7E7',
  },
  navEmoji: {
    fontSize: 21,
  },
  navEmojiActive: {
    color: GREEN,
  },
  navLabel: {
    fontSize: 11,
    color: GRAY,
    marginTop: 3,
  },
  navLabelActive: {
    color: GREEN,
    fontWeight: '800',
  },
});