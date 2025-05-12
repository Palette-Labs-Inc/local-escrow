import dayjs from 'dayjs'
import { isActiveCatalog } from './time'

describe('isActiveCatalog', () => {
  it('should return true if the catalog is active', () => {
    const mondayMidDay = dayjs().tz('America/New_York').day(1).hour(13).minute(0).toDate()
    expect(
      isActiveCatalog(
        [
          {
            dayOfWeek: 'MONDAY',
            start: {
              localHour: 10,
              localMinute: 0,
            },
            end: {
              localHour: 18,
              localMinute: 0,
            },
          },
        ],
        mondayMidDay,
        'America/New_York',
      ),
    ).toBe(true)
  })

  it('should return false if the catalog is active', () => {
    const mondayMidDay = dayjs().tz('America/New_York').day(1).hour(18).minute(1).toDate()
    expect(
      isActiveCatalog(
        [
          {
            dayOfWeek: 'MONDAY',
            start: {
              localHour: 10,
              localMinute: 0,
            },
            end: {
              localHour: 18,
              localMinute: 0,
            },
          },
        ],
        mondayMidDay,
        'America/New_York',
      ),
    ).toBe(false)
  })
})
