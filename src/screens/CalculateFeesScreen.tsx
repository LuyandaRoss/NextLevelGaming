import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { InputField } from '../components/InputField';
import { PlayerCounter } from '../components/PlayerCounter';
import { PriceSummary } from '../components/PriceSummary';
import { Button } from '../components/Button';
import { EXPERIENCES, ExperienceItem } from '../data/experiences';
import { OPTIONAL_EXTRAS } from '../data/extras';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, QuotationParams } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CalculateFees'>;

export const CalculateFeesScreen: React.FC<Props> = ({ route, navigation }) => {
  // Form State
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [selectedExp, setSelectedExp] = useState<ExperienceItem>(EXPERIENCES[0]);
  const [players, setPlayers] = useState<number>(1);
  const [sessionHours, setSessionHours] = useState<number>(1);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);

  // Validation State
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Calculation State
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [vat, setVat] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // Handle route param defaults
  useEffect(() => {
    if (route.params?.initialExperienceId) {
      const found = EXPERIENCES.find((e) => e.id === route.params?.initialExperienceId);
      if (found) {
        setSelectedExp(found);
        setPlayers(found.minPlayers);
      }
    }
  }, [route.params?.initialExperienceId]);

  // Recalculate fees automatically whenever parameters change
  useEffect(() => {
    calculateFees();
  }, [selectedExp, players, sessionHours, selectedExtraIds]);

  const calculateFees = () => {
    // Base fee = rate * players * hours
    const baseFee = selectedExp.basePricePerHour * players * sessionHours;

    // Extras fee = sum of extras * players
    const extrasTotal = selectedExtraIds.reduce((sum, extraId) => {
      const extra = OPTIONAL_EXTRAS.find((item) => item.id === extraId);
      return sum + (extra ? extra.pricePerPerson * players : 0);
    }, 0);

    const calcSubtotal = baseFee + extrasTotal;

    // Apply 10% discount for groups of 5 or more players
    let calcDiscount = 0;
    if (players >= 5) {
      calcDiscount = calcSubtotal * 0.1;
    }

    const discountedSubtotal = calcSubtotal - calcDiscount;
    const calcVat = discountedSubtotal * 0.15; // 15% VAT
    const calcTotal = discountedSubtotal + calcVat;

    setSubtotal(calcSubtotal);
    setDiscount(calcDiscount);
    setVat(calcVat);
    setTotal(calcTotal);
  };

  const toggleExtra = (id: string) => {
    if (selectedExtraIds.includes(id)) {
      setSelectedExtraIds(selectedExtraIds.filter((item) => item !== id));
    } else {
      setSelectedExtraIds([...selectedExtraIds, id]);
    }
  };

  const validate = (): boolean => {
    let valid = true;
    const errs: Record<string, string> = {};

    if (!name.trim()) {
      errs.name = 'First name is required';
      valid = false;
    }
    if (!surname.trim()) {
      errs.surname = 'Surname is required';
      valid = false;
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Valid email is required';
      valid = false;
    }
    if (!phone.trim() || phone.length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleReset = () => {
    setName('');
    setSurname('');
    setEmail('');
    setPhone('');
    setSelectedExp(EXPERIENCES[0]);
    setPlayers(1);
    setSessionHours(1);
    setSelectedExtraIds([]);
    setErrors({});
  };

  const handleContinueToBooking = () => {
    if (!validate()) {
      Alert.alert('Validation Error', 'Please complete all customer details accurately before proceeding.');
      return;
    }

    const quotationData: QuotationParams = {
      name,
      surname,
      email,
      phone,
      experienceId: selectedExp.id,
      experienceTitle: selectedExp.title,
      players,
      sessionHours,
      selectedExtraIds,
      subtotal,
      discount,
      vat,
      total,
    };

    navigation.navigate('Booking', { quotation: quotationData });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="CALCULATE FEES" subtitle="Get an instant live quotation" />

      {/* Customer Info */}
      <Text style={styles.sectionHeader}>1. CUSTOMER INFORMATION</Text>
      <InputField
        label="First Name"
        placeholder="e.g. Alex"
        value={name}
        onChangeText={setName}
        error={errors.name}
      />
      <InputField
        label="Surname"
        placeholder="e.g. Mercer"
        value={surname}
        onChangeText={setSurname}
        error={errors.surname}
      />
      <InputField
        label="Email Address"
        placeholder="alex@example.com"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
      />
      <InputField
        label="Phone Number"
        placeholder="0821234567"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        error={errors.phone}
      />

      {/* Experience Selection */}
      <Text style={styles.sectionHeader}>2. SELECT EXPERIENCE</Text>
      <View style={styles.expSelector}>
        {EXPERIENCES.map((exp) => (
          <TouchableOpacity
            key={exp.id}
            style={[
              styles.expChip,
              selectedExp.id === exp.id && styles.expChipSelected,
            ]}
            onPress={() => {
              setSelectedExp(exp);
              if (players < exp.minPlayers) setPlayers(exp.minPlayers);
              if (players > exp.maxPlayers) setPlayers(exp.maxPlayers);
            }}
          >
            <Text
              style={[
                styles.expChipText,
                selectedExp.id === exp.id && styles.expChipTextSelected,
              ]}
            >
              {exp.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Counter Controls */}
      <Text style={styles.sectionHeader}>3. PLAYERS & DURATION</Text>
      <PlayerCounter
        label={`Number of Players (${selectedExp.minPlayers}-${selectedExp.maxPlayers})`}
        value={players}
        min={selectedExp.minPlayers}
        max={selectedExp.maxPlayers}
        onChange={setPlayers}
      />

      <PlayerCounter
        label="Session Hours (1 - 8 Hours)"
        value={sessionHours}
        min={1}
        max={8}
        onChange={setSessionHours}
      />

      {/* Extras */}
      <Text style={styles.sectionHeader}>4. OPTIONAL EXTRAS</Text>
      {OPTIONAL_EXTRAS.map((extra) => {
        const isSelected = selectedExtraIds.includes(extra.id);
        return (
          <TouchableOpacity
            key={extra.id}
            style={[styles.extraRow, isSelected && styles.extraRowSelected]}
            onPress={() => toggleExtra(extra.id)}
          >
            <Text style={styles.extraCheck}>{isSelected ? '☑' : '☐'}</Text>
            <Text style={styles.extraName}>{extra.name}</Text>
            <Text style={styles.extraPrice}>+R{extra.pricePerPerson}/p</Text>
          </TouchableOpacity>
        );
      })}

      {/* Live Quotation Summary */}
      <PriceSummary subtotal={subtotal} discount={discount} vat={vat} total={total} />

      {/* Action Buttons */}
      <View style={styles.actionColumn}>
        <Button title="CONTINUE TO BOOKING" onPress={handleContinueToBooking} variant="primary" />
        <Button title="RESET FORM" onPress={handleReset} variant="outline" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  sectionHeader: {
    color: COLORS.primaryBright,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 8,
    letterSpacing: 1,
  },
  expSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  expChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: COLORS.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  expChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryBright,
  },
  expChipText: {
    color: COLORS.textSecondary,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  expChipTextSelected: {
    color: COLORS.textPrimary,
  },
  extraRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  extraRowSelected: {
    borderColor: COLORS.primaryBright,
    backgroundColor: COLORS.surfaceLight,
  },
  extraCheck: { color: COLORS.primaryBright, fontSize: 16, marginRight: 10 },
  extraName: { flex: 1, color: COLORS.textPrimary, fontSize: 13 },
  extraPrice: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '700' },
  actionColumn: { gap: 8, marginTop: 10, marginBottom: 30 },
});
