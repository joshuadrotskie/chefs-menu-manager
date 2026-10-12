import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const COURSES = ['Starter', 'Main Course', 'Dessert', 'Drink', 'Side'];

export default function App() {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    const nextErrors = {};

    if (!dishName.trim()) nextErrors.dishName = 'Please enter the dish name.';
    if (!description.trim()) nextErrors.description = 'Please enter a description.';
    if (!course) nextErrors.course = 'Please select a course.';
    if (!price.trim()) {
      nextErrors.price = 'Please enter a price.';
    } else if (!Number.isFinite(Number(price)) || Number(price) <= 0) {
      nextErrors.price = 'Enter a valid price greater than 0.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const addMenuItem = () => {
    setSuccessMessage('');
    if (!validateForm()) return;

    const newItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: Number(price).toFixed(2),
    };

    setMenuItems((currentItems) => [newItem, ...currentItems]);
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});
    setSuccessMessage(`${newItem.dishName} was successfully added to the menu.`);
  };

  const renderError = (field) =>
    errors[field] ? <Text style={styles.errorText}>{errors[field]}</Text> : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#17211c" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🍽️</Text>
            </View>
            <Text style={styles.eyebrow}>CHEF'S WORKSPACE</Text>
            <Text style={styles.title}>Menu Manager</Text>
            <Text style={styles.subtitle}>Build a menu worth coming back for.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Add a menu item</Text>
            <Text style={styles.sectionDescription}>
              Fill in the details below. Fields marked with * are required.
            </Text>

            {successMessage ? (
              <View style={styles.successBanner}>
                <Text style={styles.successIcon}>✓</Text>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Dish name *</Text>
            <TextInput
              style={[styles.input, errors.dishName && styles.inputError]}
              placeholder="e.g. Creamy mushroom pasta"
              placeholderTextColor="#89918c"
              value={dishName}
              onChangeText={(value) => {
                setDishName(value);
                if (errors.dishName) setErrors((old) => ({ ...old, dishName: undefined }));
                setSuccessMessage('');
              }}
              maxLength={70}
              returnKeyType="next"
            />
            {renderError('dishName')}

            <Text style={styles.label}>Description *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput, errors.description && styles.inputError]}
              placeholder="Describe the dish and its ingredients..."
              placeholderTextColor="#89918c"
              value={description}
              onChangeText={(value) => {
                setDescription(value);
                if (errors.description) setErrors((old) => ({ ...old, description: undefined }));
                setSuccessMessage('');
              }}
              multiline
              textAlignVertical="top"
              maxLength={300}
            />
            {renderError('description')}

            <Text style={styles.label}>Course *</Text>
            <View style={styles.courseOptions}>
              {COURSES.map((item) => {
                const selected = course === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.courseChip, selected && styles.courseChipSelected]}
                    onPress={() => {
                      setCourse(item);
                      if (errors.course) setErrors((old) => ({ ...old, course: undefined }));
                      setSuccessMessage('');
                    }}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text style={[styles.courseChipText, selected && styles.courseChipTextSelected]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {renderError('course')}

            <Text style={styles.label}>Price (R) *</Text>
            <View style={[styles.priceWrap, errors.price && styles.inputError]}>
              <Text style={styles.currency}>R</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="0.00"
                placeholderTextColor="#89918c"
                value={price}
                onChangeText={(value) => {
                  setPrice(value.replace(/[^0-9.]/g, ''));
                  if (errors.price) setErrors((old) => ({ ...old, price: undefined }));
                  setSuccessMessage('');
                }}
                keyboardType="decimal-pad"
                maxLength={10}
              />
            </View>
            {renderError('price')}

            <TouchableOpacity style={styles.addButton} onPress={addMenuItem} activeOpacity={0.85}>
              <Text style={styles.addButtonText}>＋  Add to menu</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuHeadingRow}>
            <View>
              <Text style={styles.menuTitle}>Your menu</Text>
              <Text style={styles.menuSubtitle}>Items added in this session</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{menuItems.length}</Text>
            </View>
          </View>

          {menuItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🥗</Text>
              <Text style={styles.emptyTitle}>Your menu is empty</Text>
              <Text style={styles.emptyText}>
                Your culinary empire starts with one dish. Add your first menu item using the form above.
              </Text>
            </View>
          ) : (
            menuItems.map((item) => (
              <View key={item.id} style={styles.menuItemCard}>
                <View style={styles.menuItemTop}>
                  <View style={styles.menuItemTitleWrap}>
                    <Text style={styles.menuItemName}>{item.dishName}</Text>
                    <Text style={styles.courseTag}>{item.course}</Text>
                  </View>
                  <Text style={styles.itemPrice}>R {item.price}</Text>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
            ))
          )}

          <Text style={styles.footer}>CHEF'S MENU MANAGER · FIRST VERSION</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: '#17211c' },
  container: { paddingHorizontal: 18, paddingBottom: 34 },
  header: { alignItems: 'center', paddingTop: 28, paddingBottom: 25 },
  logoCircle: {
    width: 62, height: 62, borderRadius: 31, backgroundColor: '#d9f27e',
    alignItems: 'center', justifyContent: 'center', marginBottom: 15,
  },
  logoEmoji: { fontSize: 29 },
  eyebrow: { color: '#d9f27e', fontSize: 11, fontWeight: '800', letterSpacing: 2.4, marginBottom: 7 },
  title: { color: '#ffffff', fontSize: 32, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { color: '#b5c0b8', fontSize: 14, marginTop: 7 },
  card: { backgroundColor: '#ffffff', borderRadius: 22, padding: 20, marginBottom: 28 },
  sectionTitle: { color: '#1b2820', fontSize: 21, fontWeight: '800' },
  sectionDescription: { color: '#68736b', fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 20 },
  label: { color: '#27342b', fontSize: 13, fontWeight: '800', marginBottom: 8, marginTop: 13 },
  input: {
    minHeight: 49, borderWidth: 1, borderColor: '#dce3dd', borderRadius: 11,
    paddingHorizontal: 13, color: '#1b2820', backgroundColor: '#fbfcfb', fontSize: 14,
  },
  multilineInput: { minHeight: 94, paddingTop: 12 },
  inputError: { borderColor: '#d94b4b', borderWidth: 1.4 },
  errorText: { color: '#c52f36', fontSize: 12, marginTop: 6, lineHeight: 17 },
  courseOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  courseChip: { borderWidth: 1, borderColor: '#dce3dd', borderRadius: 20, paddingVertical: 9, paddingHorizontal: 13, backgroundColor: '#fbfcfb' },
  courseChipSelected: { backgroundColor: '#20362a', borderColor: '#20362a' },
  courseChipText: { color: '#4f5d53', fontSize: 12, fontWeight: '700' },
  courseChipTextSelected: { color: '#e2f89a' },
  priceWrap: {
    flexDirection: 'row', alignItems: 'center', minHeight: 49, borderWidth: 1,
    borderColor: '#dce3dd', borderRadius: 11, backgroundColor: '#fbfcfb', paddingHorizontal: 13,
  },
  currency: { color: '#4f5d53', fontSize: 15, fontWeight: '800', marginRight: 9 },
  priceInput: { flex: 1, color: '#1b2820', fontSize: 14, paddingVertical: 10 },
  addButton: { backgroundColor: '#20362a', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 23 },
  addButtonText: { color: '#e2f89a', fontSize: 15, fontWeight: '800' },
  successBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#edf8e4', borderColor: '#c7e6ae', borderWidth: 1, padding: 11, borderRadius: 10, marginBottom: 7 },
  successIcon: { color: '#2e6d38', fontWeight: '900', fontSize: 17, marginRight: 9 },
  successText: { flex: 1, color: '#2e6d38', fontSize: 12, fontWeight: '700', lineHeight: 17 },
  menuHeadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  menuTitle: { color: '#ffffff', fontSize: 23, fontWeight: '900' },
  menuSubtitle: { color: '#b5c0b8', fontSize: 12, marginTop: 4 },
  countBadge: { minWidth: 38, height: 38, borderRadius: 19, backgroundColor: '#d9f27e', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8 },
  countText: { color: '#20362a', fontSize: 15, fontWeight: '900' },
  emptyState: { backgroundColor: '#223029', borderWidth: 1, borderColor: '#35463b', borderStyle: 'dashed', borderRadius: 18, alignItems: 'center', paddingHorizontal: 25, paddingVertical: 28 },
  emptyEmoji: { fontSize: 33, marginBottom: 10 },
  emptyTitle: { color: '#ffffff', fontSize: 16, fontWeight: '800' },
  emptyText: { color: '#b5c0b8', fontSize: 13, textAlign: 'center', lineHeight: 20, marginTop: 7 },
  menuItemCard: { backgroundColor: '#ffffff', borderRadius: 15, padding: 16, marginBottom: 11 },
  menuItemTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 },
  menuItemTitleWrap: { flex: 1 },
  menuItemName: { color: '#1b2820', fontSize: 16, fontWeight: '800' },
  courseTag: { alignSelf: 'flex-start', overflow: 'hidden', color: '#45613f', backgroundColor: '#edf5df', fontSize: 10, fontWeight: '800', paddingHorizontal: 9, paddingVertical: 5, borderRadius: 12, marginTop: 7 },
  itemPrice: { color: '#2c6037', fontSize: 15, fontWeight: '900' },
  itemDescription: { color: '#68736b', fontSize: 13, lineHeight: 19, marginTop: 12 },
  footer: { textAlign: 'center', color: '#718077', fontSize: 9, fontWeight: '700', letterSpacing: 1.5, marginTop: 24 },
});
