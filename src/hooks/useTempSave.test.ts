import { act, renderHook } from '@testing-library/react';
import { type FunnelProps } from '@/app/(pages)/challenge/[challengeId]/mission/create/_components/ChallengeCreateFunnel/_context/context';
import useTempSave from './useTempSave';

describe('useTempSave', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('초기 상태가 올바르게 설정되어야 함', () => {
    const { result } = renderHook(() => useTempSave({ id: 'mission-create' }));

    expect(result.current.isSaving).toBe(false);
    expect(result.current.savedTempData).toEqual(undefined);
    expect(result.current.draftTempData).toEqual(undefined);
  });

  it('초기 상태에 로컬스토리지 값을 반영해야 함', () => {
    window.localStorage.setItem('mission-create', JSON.stringify({ name: '저장된 미션' }));
    const { result } = renderHook(() => useTempSave<FunnelProps>({ id: 'mission-create' }));

    expect(result.current.savedTempData).toEqual({ name: '저장된 미션' });
    expect(result.current.draftTempData).toEqual({ name: '저장된 미션' });
  });

  it('saveTempData가 데이터를 localStorage에 저장하고 isSaving을 true로 설정해야 함', () => {
    const { result } = renderHook(() => useTempSave<FunnelProps>({ id: 'mission-create' }));

    act(() => {
      result.current.saveTempData({ name: '저장된 미션' });
    });

    expect(result.current.isSaving).toBe(true);
    expect(result.current.savedTempData).toEqual({ name: '저장된 미션' });
  });

  it('updateDraftTempData가 미저장 데이터를 업데이트해야 함', () => {
    const { result } = renderHook(() => useTempSave<FunnelProps>({ id: 'mission-create' }));

    act(() => {
      result.current.saveTempData({ name: '저장된 미션' });
      result.current.updateDraftTempData({ name: '새로운 미션' });
    });

    expect(result.current.draftTempData).toEqual({ name: '새로운 미션' });
  });

  it('clearTempData가 데이터를 초기화해야 함', () => {
    const { result } = renderHook(() => useTempSave<FunnelProps>({ id: 'mission-create' }));

    act(() => {
      result.current.saveTempData({ name: '저장된 미션' });
      result.current.clearTempData();
    });

    expect(result.current.isSaving).toBe(false);
    expect(result.current.savedTempData).toEqual(undefined);
    expect(result.current.draftTempData).toEqual(undefined);
  });

  it('autoSave가 isSaving이 true일 때만 데이터를 저장해야 함', () => {
    const { result } = renderHook(() => useTempSave<FunnelProps>({ id: 'mission-create' }));

    // isSaving: false
    act(() => {
      result.current.autoSave({ name: '자동 저장 미션' });
    });
    expect(result.current.savedTempData).toEqual(undefined);

    // isSaving을 true로 설정
    act(() => {
      result.current.saveTempData({ name: '첫 번째 저장' });
    });

    // isSaving: true
    act(() => {
      result.current.autoSave({ name: '자동 저장 미션' });
    });
    expect(result.current.savedTempData).toEqual({ name: '자동 저장 미션' });
  });
});
